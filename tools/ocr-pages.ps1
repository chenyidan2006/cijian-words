param([string]$ImageFolder = 'tmp\pdfs')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType=WindowsRuntime] | Out-Null
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1)
function Await-WinRT($operation, $resultType) {
    $task = $asTask.MakeGenericMethod($resultType).Invoke($null, @($operation))
    try { $task.Wait() } catch { throw $task.Exception.InnerException }
    return $task.Result
}
$langs = [Windows.Media.Ocr.OcrEngine]::AvailableRecognizerLanguages
Write-Output ('Languages: ' + (($langs | ForEach-Object { $_.LanguageTag }) -join ','))
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $engine) { throw 'No OCR language available' }
Get-ChildItem -LiteralPath $ImageFolder -Filter 'book-*.png' | Sort-Object Name | ForEach-Object {
    $imagePath = $_.FullName
    $targetPath = [IO.Path]::ChangeExtension($imagePath, '.txt')
    if ((Test-Path -LiteralPath $targetPath) -and (Get-Item -LiteralPath $targetPath).Length -gt 0) { return }
    $file = Await-WinRT ([Windows.Storage.StorageFile]::GetFileFromPathAsync($imagePath)) ([Windows.Storage.StorageFile])
    $stream = Await-WinRT ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await-WinRT ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = Await-WinRT ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $result = Await-WinRT ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $text = ($result.Lines | ForEach-Object { $_.Text }) -join "`n"
    [IO.File]::WriteAllText($targetPath, $text, [Text.UTF8Encoding]::new($false))
    Write-Output ($_.Name + ' chars=' + $text.Length)
    $bitmap.Dispose(); $stream.Dispose()
}
