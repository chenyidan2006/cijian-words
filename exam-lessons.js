// Context-specific paraphrases: associated terms in the reference files are not universal synonyms.
const EXAM_ROWS=`
listening|reserve|预订|book a room|预订房间|I'd like to book a room for Friday.|我想预订周五的房间。|I'd like to reserve a room for Friday.||这里 book 与 reserve 都可表示预订房间。
listening|in advance|提前|ahead of time|提前|Please let us know ahead of time.|请提前告知我们。|Please let us know in advance.|of|in advance 和 ahead of time 在本句都表示提前。
listening|have to|必须|need to register|需要注册|You need to register before Monday.|你需要在周一前注册。|You have to register before Monday.|to|本句表达注册要求；should 通常比 have to 弱，不直接等同。
listening|adjust|调整|modify the plan|修改计划|We may need to modify the plan.|我们可能需要修改计划。|We may need to adjust the plan.||modify 或 adjust 都可用于调整计划，语气略有不同。
listening|establish|建立|set up a club|建立一个社团|The students want to set up a club.|学生们想建立一个社团。|The students want to establish a club.|up|set up 较口语，establish 较正式。
listening|transfer|迁移；调动|relocate the office|搬迁办公室|We plan to relocate the office next month.|我们计划下个月搬迁办公室。|We plan to transfer the office to a new location next month.||relocate 在此强调改变办公地点。
listening|feature|特点|a distinctive characteristic|一个显著特点|The red roof is a distinctive characteristic.|红色屋顶是一个显著特点。|The red roof is a distinctive feature.||feature 与 characteristic 在描述特点时可近义。
listening|entertainment|娱乐|leisure activities|休闲活动|The centre offers a range of leisure activities.|这个中心提供多种休闲活动。|The centre offers various forms of entertainment.||语境中都在介绍可参加的娱乐活动，不是所有 entertainment 都等于 leisure。
listening|press|新闻界；媒体|the local media|当地媒体|I spoke to the local media about the event.|我向当地媒体谈了这次活动。|I spoke to the local press about the event.||media 范围可以比 press 更广；本句都是当地新闻媒体。
listening|movie|电影|a film festival|一个电影节|The city hosts a film festival every year.|这座城市每年举办一个电影节。|The city hosts a movie festival every year.||film 和 movie 在表示电影时常可替换。
listening|countryside|乡村|a rural area|一个乡村地区|She grew up in a rural area.|她在乡村地区长大。|She grew up in the countryside.||rural 作形容词，countryside 作名词，句型跟着改变。
listening|urban|城市的|city life|城市生活|Some people prefer city life.|有些人更喜欢城市生活。|Some people prefer an urban lifestyle.||urban lifestyle 可在这句中改写为 city life。
listening|near|在附近|close to campus|靠近校园|I'd like a room close to campus.|我想要一间靠近校园的房间。|I'd like a room near campus.|to|near 后直接接地点；close 后需要 to。
listening|remote|偏远的|an isolated village|一个偏僻村庄|They visited an isolated village.|他们参观了一个偏僻村庄。|They visited a remote village.||isolated 强调与外界隔离；remote 强调偏远，本句语义接近。
listening|advantage|优点|a major benefit|一个主要好处|Flexible hours are a major benefit.|灵活工时是一个主要好处。|Flexible hours are a major advantage.||benefit 强调益处，advantage 强调有利之处。
listening|disadvantage|缺点|a serious drawback|一个严重缺点|The lack of transport is a serious drawback.|缺少交通服务是一个严重缺点。|The lack of transport is a serious disadvantage.||drawback 是谈论方案缺点时常用的名词。
listening|purpose|目的|the main goal|主要目标|We agree that the main goal is to reduce waste.|我们认同主要目标是减少浪费。|We agree that the main purpose is to reduce waste.||purpose 侧重目的，goal 侧重想达成的结果。
listening|approach|方法|a different method|一种不同的方法|We need a different method.|我们需要一种不同的方法。|We need a different approach.||approach 和 method 在本句中都指处理方式。
listening|motivate|激励|encourage students to read|鼓励学生阅读|We want to encourage students to read.|我们想鼓励学生阅读。|We want to motivate students to read.|to|encourage someone to do；motivate someone to do。
listening|omit|省略|leave out the details|省略细节|You can leave out the details.|你可以省略细节。|You can omit the details.|out|leave something out；代词放中间，如 leave it out。
listening|opportunity|机会|a chance to study abroad|一个出国学习的机会|This is a chance to study abroad.|这是一个出国学习的机会。|This is an opportunity to study abroad.|to|a chance/opportunity to do 后接想做的事。
listening|difficult|困难的|hard to explain|很难解释|The change is hard to explain.|这个变化很难解释。|The change is difficult to explain.|to|hard 在这里是困难的，不是坚硬的。
listening|feedback|反馈|a response to my suggestion|对我的建议的回应|I'd like a response to my suggestion.|我希望收到对我的建议的回应。|I'd like some feedback on my suggestion.|to|response to；feedback on，改写时介词也要改变。
listening|result|结果|an unexpected outcome|一个意外结果|The study had an unexpected outcome.|研究出现了一个意外结果。|The study had an unexpected result.||outcome 侧重最终结果，常用于研究或过程。
listening|handle|处理|deal with complaints|处理投诉|My job is to deal with complaints.|我的工作是处理投诉。|My job is to handle complaints.|with|handle 后直接接宾语；deal 后要加 with。
listening|support|帮助；支持|financial assistance|经济援助|Students can apply for financial assistance.|学生可以申请经济援助。|Students can apply for financial support.||financial assistance 比 financial support 略正式。
listening|ideal|理想的|the perfect location|理想的位置|This is the perfect location for our office.|这是我们办公室的理想位置。|This is the ideal location for our office.||在评价位置十分合适时，perfect 与 ideal 可近义。
listening|restrict|限制|limit the number of visitors|限制访客人数|We need to limit the number of visitors.|我们需要限制访客人数。|We need to restrict the number of visitors.|of|the number of + 复数名词，表示……的数量。
listening|similar|相似的|look like the original|看起来像原作|The copies look like the original.|这些复制品看起来像原作。|The copies are similar to the original.|like|look like 侧重外观；be similar to 可用于更广泛的相似。
listening|copy|复制|reproduce the image|复制图像|You need permission to reproduce the image.|你需要获得许可才能复制图像。|You need permission to copy the image.||reproduce 在这里表示复制，不是繁殖。
reading|resemble|与……相似|be similar to the original|与原作相似|The copy seems to be similar to the original.|复制品似乎与原作相似。|The copy seems to resemble the original.|to|resemble 后不加介词；be similar 后用 to。
reading|recognize|承认；识别|acknowledge the problem|承认这个问题|We need to acknowledge the problem.|我们需要承认这个问题。|We need to recognize the problem.||recognize 的承认义可与 acknowledge 接近；认脸时不这样替换。
reading|fundamental|基本的；根本的|basic principles|基本原则|The lesson covers basic principles.|这节课讲解基本原则。|The lesson covers fundamental principles.||本句 basic 和 fundamental 都修饰 principles。
reading|rely on|依赖|depend on others|依靠别人|I don't want to depend on others for everything.|我不想事事依靠别人。|I don't want to rely on others for everything.|on|depend on 与 rely on 都需要 on。
reading|domestic|国内的；家庭的|the national market|全国市场|The business focuses on the national market.|这家企业专注于全国市场。|The business focuses on the domestic market.||在谈本国贸易时 national 与 domestic 有交集；domestic 还有家庭的意思。
reading|measure|测量；衡量|assess our progress|评估我们的进步|We need to assess our progress.|我们需要评估自己的进步。|We need to measure our progress.||measure 抽象进展时可接近 assess；量长度时不能直接等同。
reading|trait|特征|a key feature|一个主要特征|Adaptability is a key feature of the system.|适应能力是这个系统的一个主要特征。|Adaptability is a key trait of the system.||trait、feature 都可以描述特性，但常用搭配不同。
reading|coin|创造新词|invent a term|创造一个术语|It's not easy to invent a term.|创造一个术语并不容易。|It's not easy to coin a term.||coin 作动词可以指创造新词，而不只是硬币。
reading|artificial|人造的|man-made materials|人造材料|The bag is made from man-made materials.|这个包用人造材料制成。|The bag is made from artificial materials.||man-made 有连字符；在本句中指人为制造。
reading|ignore|忽视|overlook an important detail|忽略一个重要细节|It's easy to overlook an important detail.|人很容易忽略一个重要细节。|It's easy to ignore an important detail.||overlook 常指无意忽略，ignore 常含不理会；这里提醒注意细节。
reading|diversity|多样性|a wide variety of plants|种类繁多的植物|The garden has a wide variety of plants.|花园里有种类繁多的植物。|The garden has a great diversity of plants.|of|variety of 和 diversity of 在谈种类丰富时可改写。
reading|alternative|替代选择|a suitable substitute|一个合适的替代品|We need a suitable substitute.|我们需要一个合适的替代品。|We need a suitable alternative.||substitute 强调替代品，alternative 强调另一个可选方案。
reading|compensate|补偿|make up for lost time|弥补失去的时间|We need to make up for lost time.|我们需要弥补失去的时间。|We need to compensate for lost time.|for|compensate for 和 make up for 都保留 for。
reading|criteria|标准|clear standards|明确的标准|The assessment uses clear standards.|评估采用明确的标准。|The assessment uses clear criteria.||criteria 是 criterion 的复数。
reading|curriculum|课程体系|a course of study|一套学习课程|The college offers a course of study in design.|这所学院提供一套设计学习课程。|The college offers a curriculum in design.|of|curriculum 是整体课程安排，不一定指单节课。
reading|transmit|传输|send information|发送信息|The device can send information wirelessly.|这个设备可以无线发送信息。|The device can transmit information wirelessly.||transmit 在技术语境常译为传输。
reading|extinct|灭绝的|die out|灭绝|Without protection, some species may die out.|如果不加以保护，一些物种可能灭绝。|Without protection, some species may become extinct.|out|become extinct 与 die out 句型不同，表达走向灭绝。
reading|exclusive|独有的；专属的|available only to members|仅限会员使用|This service is available only to members.|这项服务仅限会员使用。|This service is exclusive to members.|to|exclusive to members 解释为 available only to members，不能简单改成 the only option。
reading|guarantee|保证|assure you of the quality|向你保证质量|We can assure you of the quality.|我们可以向你保证质量。|We can guarantee the quality.||assure 人 of 事情；guarantee 后可直接接事情。
reading|vicinity|附近|in the neighbourhood|在附近|There are several shops in the neighbourhood.|附近有几家商店。|There are several shops in the vicinity.|in|vicinity 较正式，neighbourhood 可指邻里地区。
reading|threaten|危及；威胁|endanger local wildlife|危及当地野生动物|Pollution can endanger local wildlife.|污染可能危及当地野生动物。|Pollution can threaten local wildlife.||endanger 强调置于危险中；threaten 在此表示威胁安全。
reading|accumulate|积累|gather evidence|收集证据|The researchers continue to gather evidence.|研究人员继续收集证据。|The researchers continue to accumulate evidence.||gather 收集，accumulate 强调逐渐积累，语境中有交集。
reading|permit|允许|allow students to leave|允许学生离开|The rules allow students to leave early.|规则允许学生提前离开。|The rules permit students to leave early.|to|allow/permit someone to do 都需要宾语加 to do。
reading|explicit|明确的|clear instructions|清楚的说明|Please provide clear instructions.|请提供清楚的说明。|Please provide explicit instructions.||explicit 强调明确说出、不含糊，clear 范围更广。
reading|exploit|利用；开发|use local resources|利用当地资源|The project will use local resources.|这个项目将利用当地资源。|The project will exploit local resources.||exploit 也可能有过度利用或剥削的负面含义，需看语境。
reading|extend|扩展|expand our services|扩展我们的服务|We plan to expand our services next year.|我们计划明年扩展服务。|We plan to extend our services next year.||expand 与 extend 在扩展服务范围时接近。
reading|reluctant|不情愿的|unwilling to change|不愿改变|Some people are unwilling to change.|有些人不愿改变。|Some people are reluctant to change.|to|reluctant/unwilling to do 都用 to do；reluctant 可带犹豫意味。
reading|reproduce|繁殖|breed in captivity|在圈养环境中繁殖|These animals can breed in captivity.|这些动物能够在圈养环境中繁殖。|These animals can reproduce in captivity.|in|reproduce 在这里是繁殖；在图像语境中可指复制。
reading|well-being|健康；幸福|physical health|身体健康|The programme focuses on physical health.|这个项目关注身体健康。|The programme focuses on physical well-being.||well-being 范围可包括心理、生活状态；physical 在此限定身体层面。
reading|tremendous|巨大的|a vast amount of data|大量数据|The system stores a vast amount of data.|这个系统存储大量数据。|The system stores a tremendous amount of data.|of|amount of 修饰不可数概念；本句 data 作为集合概念使用。
`.trim();
window.EXAM_LESSONS=EXAM_ROWS.split('\n').map((row,i)=>{
 const [examSource,word,meaning,phrase,phraseZh,sentence,zh,originalSentence,prep,tip]=row.split('|');
 const sourceRecord=window.EXAM_SOURCES[examSource].data.find(r=>r.word.toLowerCase()===word.toLowerCase());
 return {id:'exam-'+examSource+'-'+word.replace(/[^a-z]+/g,'-'),word,meaning,phrase,phraseZh,sentence,zh,originalSentence,prep:prep||'',tip,examSource,sourceRecordId:sourceRecord?.id||'',sourcePage:sourceRecord?.pdfPage||null,sourceTable:sourceRecord?.table||null,sourceRow:sourceRecord?.row||null,theme:examSource==='listening'?'听力替换':'阅读考点',scene:examSource==='listening'?'听力替换':'阅读改写',source:'exam-adapted'};
});
window.LESSONS.push(...window.EXAM_LESSONS);
