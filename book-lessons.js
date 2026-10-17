// Based on collocations and entries in the user's supplied scanned book.
// page = printed page; PDF page = printed page + 11. Examples are newly written.
window.BOOK_CHAPTERS=[[1,'自然地理'],[21,'植物研究'],[31,'动物保护'],[45,'太空探索'],[53,'学校教育'],[85,'科技发明'],[95,'文化历史'],[103,'语言演化'],[109,'娱乐运动'],[123,'物品材料'],[135,'时尚潮流'],[145,'饮食健康'],[159,'建筑场所'],[171,'交通旅行'],[183,'国家政府'],[197,'社会经济'],[213,'法律法规'],[223,'沙场争锋'],[241,'社会角色'],[253,'行为动作'],[275,'身心健康'],[307,'时间日期']];
const BOOK_ROWS=`
3|the greenhouse effect|greenhouse|温室|the greenhouse effect|温室效应|Today's lesson explains the greenhouse effect.|今天的课讲解温室效应。|自然环境|课堂讨论||effect 在这里指效应，不是 affect（影响，动词）。
3|a greenhouse gas|greenhouse|温室|a greenhouse gas|一种温室气体|Carbon dioxide is a greenhouse gas.|二氧化碳是一种温室气体。|自然环境|课堂讨论||gas 在此是可数名词；复数为 gases。
3|a natural phenomenon|phenomenon|现象|a natural phenomenon|一种自然现象|A rainbow is a natural phenomenon.|彩虹是一种自然现象。|自然环境|课堂讨论||phenomenon 是单数，复数为 phenomena。
3|a social phenomenon|phenomenon|现象|a social phenomenon|一种社会现象|Online shopping has become a social phenomenon.|网购已经成为一种社会现象。|社会发展|课堂讨论||把 social 和 natural 放在一起辨析，表达不同类型的现象。
3|cause a calamity|calamity|灾祸|cause a calamity|酿成灾祸|A small mistake could cause a calamity.|一个小错误可能酿成灾祸。|自然环境|课堂讨论||calamity 语气很重，指严重灾祸。
3|jeopardise sb.'s life|jeopardise|危及|jeopardise people's lives|危及人们的生命|Ignoring safety rules can jeopardise people's lives.|忽视安全规定可能危及人们的生命。|社会发展|课堂讨论||jeopardise 后直接接宾语；美式拼写为 jeopardize。
54|a primary school|primary|初级的；小学的|a primary school|一所小学|My sister teaches at a primary school.|我姐姐在一所小学教书。|教育学习|课堂讨论||primary school 小学；secondary school 中学。
54|a secondary school|secondary|中等教育的|a secondary school|一所中学|There is a secondary school near my home.|我家附近有一所中学。|教育学习|课堂讨论||注意 secondary 的拼写；它也有次要的意思。
54|go to college|college|学院；大学|go to college|上大学|I'd like to go to college in another city.|我想去另一座城市上大学。|教育学习|留学申请|to|go to college 表示接受大学教育，college 前通常不加 the。
55|eliminate illiteracy|illiteracy|文盲；不识字|eliminate illiteracy|扫除文盲|The programme aims to eliminate illiteracy.|这个项目旨在扫除文盲。|教育学习|课堂讨论||eliminate 彻底消除，比 reduce（减少）语气更强。
55|a controversial issue|controversial|有争议的|a controversial issue|一个有争议的问题|School uniforms remain a controversial issue.|校服仍是一个有争议的问题。|教育学习|课堂讨论||controversial issue 适合引入存在不同意见的话题。
56|enable sb. to do sth.|enable|使能够|enable students to study online|让学生能够在线学习|These tools enable students to study online.|这些工具让学生能够在线学习。|教育学习|课堂讨论|to|enable someone to do；不要漏掉 someone 或 to。
56|indulge in|indulge|沉溺；纵容|indulge in online games|沉迷网络游戏|Some teenagers indulge in online games.|一些青少年沉迷网络游戏。|教育学习|课堂讨论|in|indulge in + 名词或 doing；书中搭配补全了具体宾语。
56|spoil the view|spoil|破坏；宠坏|spoil the view|破坏景观|The new tower might spoil the view.|这座新塔可能破坏景观。|自然环境|课堂讨论||spoil 还可以表示宠坏；这里是破坏原本美好的事物。
56|alcohol abuse|abuse|滥用；虐待|alcohol abuse|酗酒|The campaign raises awareness of alcohol abuse.|这项宣传活动提高人们对酗酒的认识。|健康身体|课堂讨论||abuse 在这个搭配中作名词。
57|be capable of|capable|有能力的|be capable of solving the problem|有能力解决这个问题|You may be capable of solving the problem on your own.|你可能有能力独自解决这个问题。|教育学习|课堂讨论|of|be capable of + 名词或 doing；不是 capable to do。
58|diligent in|diligent|勤奋的|diligent in her studies|勤奋学习|She is diligent in her studies.|她学习很勤奋。|教育学习|课堂讨论|in|diligent in + 工作或学习领域。
64|a series of|series|一系列|a series of workshops|一系列研讨活动|The university offers a series of workshops.|这所大学提供一系列研讨活动。|教育学习|留学申请|of|series 单复数同形；a series of 后接复数名词。
64|save a file|file|文件|save a file|保存文件|How do I save a file on this computer?|我如何在这台电脑上保存文件？|科技数字|数字生活||save a file 保存文件；delete a file 删除文件。
64|be content with|content|满意的|be content with a simple life|满足于简单的生活|I'd like to be content with a simple life.|我希望能满足于简单的生活。|人际表达|日常聊天|with|content 在这里是形容词，重音在后；名词可指内容。
65|major in|major|主修；主要的|major in economics|主修经济学|I plan to major in economics.|我打算主修经济学。|教育学习|留学申请|in|major in + 专业；不说 major economics。
146|on a diet|diet|日常饮食；节食|on a diet|在节食|I'm not on a diet, but I eat less sugar.|我没有在节食，但我吃的糖少了。|健康身体|日常聊天|on|be on a diet 表示节食；diet 本身也可指日常饮食。
146|have a bad appetite|appetite|食欲|have a bad appetite|食欲不好|I sometimes have a bad appetite when I'm stressed.|压力大的时候，我有时食欲不好。|健康身体|看病就诊||这是描述感受的语言练习；appetite 为食欲。
146|cater to/for|cater|满足需要；提供餐饮|cater for different needs|满足不同需求|The service should cater for different needs.|这项服务应满足不同需求。|工作职场|工作协作|for|cater for 在英式英语中常指满足需要；cater to 也常见。
148|a fish bowl|bowl|碗；钵|a fish bowl|一个鱼缸|There is a fish bowl on the shelf.|架子上有一个鱼缸。|居家生活|日常聊天||bowl 也常指碗，意义由搭配决定。
148|a different kettle of fish|kettle|水壶|a different kettle of fish|另一码事|Living abroad is a different kettle of fish.|在国外生活是另一码事。|人际表达|日常聊天|of|这是习语，不按水壶和鱼的字面意义翻译。
149|a microwave oven|microwave|微波；微波炉|a microwave oven|一台微波炉|Does the flat have a microwave oven?|这套公寓有微波炉吗？|居家生活|租房入住||日常也常直接说 a microwave。
149|alcoholic beverage|beverage|饮料|an alcoholic beverage|一种酒精饮料|This drink is an alcoholic beverage.|这杯饮品是一种酒精饮料。|饮食消费|点餐购物||beverage 较正式；口语中 drink 更常见。
150|sober up|sober|清醒的；使醒酒|sober up|清醒过来|He needed time to sober up.|他需要一些时间清醒过来。|健康身体|日常聊天|up|sober up 是一个整体，不把 up 译成向上。
160|a landmark in sth.|landmark|地标；里程碑|a landmark in medical research|医学研究中的里程碑|This discovery is a landmark in medical research.|这项发现是医学研究中的里程碑。|科技数字|课堂讨论|in|landmark 可指地标，也可比喻重要进展。
161|be located in/on/at|locate|位于；定位|be located in the city centre|位于市中心|The office will be located in the city centre.|办公室将位于市中心。|交通出行|出行问路|in|in 强调区域；on 常用于路上；at 常用于具体地址。
161|settle down|settle|定居；解决|settle down|安定下来|I'd like to settle down somewhere quiet.|我想在安静的地方安定下来。|居家生活|日常聊天|down|settle down 可指安定生活，也可指安静下来。
162|a block of|block|块；街区|a block of flats|一栋公寓楼|They live in a block of flats near the station.|他们住在车站附近的一栋公寓楼里。|居家生活|租房入住|of|a block of + 复数公寓，英式表达。
162|a summer cottage|cottage|小屋；乡间别墅|a summer cottage|一座避暑小屋|My grandparents own a summer cottage.|我的祖父母有一座避暑小屋。|居家生活|日常聊天||cottage 常指乡间的小房子。
162|from the cradle to the grave|cradle|摇篮|from the cradle to the grave|从生到死|People continue learning from the cradle to the grave.|人们从生到死都在持续学习。|教育学习|课堂讨论|to|两个 the 都保留；这是比喻一生的固定表达。
162|shelter from the rain|shelter|躲避；庇护|shelter from the rain|避雨|We stopped to shelter from the rain.|我们停下来避雨。|交通出行|出行问路|from|shelter from + 需要躲避的事物。
163|a pillar of society|pillar|柱；支柱|a pillar of society|社会栋梁|She is regarded as a pillar of society.|她被视为社会栋梁。|社会发展|课堂讨论|of|pillar 在这里是比喻用法，指重要的支持者。
163|a laser beam|beam|束；梁|a laser beam|一束激光|The device produces a laser beam.|这个设备产生一束激光。|科技数字|数字生活||beam 可指一束光，也可指建筑的梁。
163|a triumphal arch|arch|拱门|a triumphal arch|一座凯旋门|We stopped beside a triumphal arch.|我们在一座凯旋门旁停了下来。|文化历史|出行问路||arch 是拱门，triumphal 表示纪念胜利的。
172|travel abroad|abroad|在国外；到国外|travel abroad|出国旅行|I'd love to travel abroad next year.|我很想明年出国旅行。|交通出行|出行问路||abroad 是副词，前面不用加 to。
172|go on safari|safari|观兽旅行|go on safari|去观兽旅行|We hope to go on safari one day.|我们希望有一天去观兽旅行。|交通出行|日常聊天|on|go on + 某些旅行或活动，例如 go on a trip。
172|a haunted house|haunt|经常出没；闹鬼|a haunted house|一座鬼屋|The story takes place in a haunted house.|故事发生在一座鬼屋里。|文化历史|日常聊天||haunted 作形容词，意为闹鬼的。
173|traffic regulations|traffic|交通|traffic regulations|交通规则|Everyone should follow traffic regulations.|每个人都应该遵守交通规则。|交通出行|出行问路||traffic 通常不可数；regulations 为复数。
173|traffic flow|flow|流动|traffic flow|车流量；车流|The new junction should improve traffic flow.|新路口应该能改善车流状况。|交通出行|课堂讨论||flow 在这里作名词，指流动情况。
173|a traffic jam|jam|堵塞；果酱|a traffic jam|交通堵塞|We got stuck in a traffic jam.|我们遇上了交通堵塞。|交通出行|出行问路||get stuck in a traffic jam 表示被堵在路上。
173|traffic congestion|congestion|拥堵|traffic congestion|交通拥堵|Better buses could reduce traffic congestion.|更好的公交服务可能缓解交通拥堵。|交通出行|课堂讨论||congestion 不可数，比 a traffic jam 更概括。
173|traffic lights|traffic|交通|traffic lights|交通信号灯|Turn left at the traffic lights.|在交通信号灯处左转。|交通出行|出行问路||at the traffic lights 表示在红绿灯处。
173|check in one's baggage|baggage|行李|check in my baggage|托运我的行李|Where can I check in my baggage?|我可以在哪里托运行李？|交通出行|出行问路|in|baggage 通常不可数；my 替换了书中的 one's。
174|on one's way to|way|路；方式|on my way to work|在我上班的路上|I bought breakfast on my way to work.|我在上班的路上买了早餐。|交通出行|日常聊天|to|on one's way to + 地点；home 前通常省略 to。
175|load a vehicle|load|装载|load a vehicle|给车辆装货|It takes two people to load a vehicle safely.|安全地给车辆装货需要两个人。|工作职场|工作协作||load A with B；把 B 装到 A 上。
175|express mail|express|快递的；表达|express mail|特快邮件|Could you send it by express mail?|你可以用特快邮件寄送吗？|交通出行|工作协作||express 在这里表示快速的，不是动词表达。
198|develop trade|trade|贸易|develop trade|发展贸易|The agreement could help develop trade.|这项协议可能有助于发展贸易。|社会发展|课堂讨论||trade 在这里为不可数名词。
198|encourage trade|trade|贸易|encourage trade|促进贸易|Better transport links can encourage trade.|更好的交通连接能促进贸易。|社会发展|课堂讨论||encourage 后直接接名词或 someone to do。
198|global trade|global|全球的|global trade|全球贸易|Technology has changed global trade.|科技已经改变了全球贸易。|社会发展|课堂讨论||global 形容词修饰 trade。
198|heavy industry|industry|工业；行业|heavy industry|重工业|The region once depended on heavy industry.|这个地区曾经依靠重工业。|社会发展|课堂讨论||heavy industry 重工业；light industry 轻工业。
198|a retail merchant|retail|零售|a retail merchant|一名零售商|She works as a retail merchant.|她是一名零售商。|金钱消费|工作协作||retail 零售；wholesale 批发。
198|raise funds|fund|资金|raise funds|筹集资金|Our club plans to raise funds for a local school.|我们社团打算为一所当地学校筹集资金。|金钱消费|工作协作||raise funds for + 筹款目的。
198|shout slogans|slogan|口号|shout slogans|喊口号|The crowd began to shout slogans.|人群开始喊口号。|社会发展|课堂讨论||slogan 是可数名词，注意复数 s。
199|a retail outlet|outlet|门店；出口|a retail outlet|一家零售门店|The company opened a retail outlet downtown.|这家公司在市中心开了一家零售门店。|金钱消费|点餐购物||outlet 还可表示出口；在这里指销售网点。
199|a 20% discount|discount|折扣|a 20% discount|八折优惠|Students can get a 20% discount.|学生可以享受八折优惠。|金钱消费|点餐购物||20% discount 是减去两成，即原价的八成。
199|change foreign currency|currency|货币|change foreign currency|兑换外币|Where can I change foreign currency?|我在哪里可以兑换外币？|金钱消费|出行问路||currency 可泛指货币；不同货币种类的复数为 currencies。
199|an academic exchange|exchange|交流；交换|an academic exchange|一次学术交流|The visit is part of an academic exchange.|这次访问是一次学术交流的一部分。|教育学习|留学申请||academic 学术的；an 在元音音素前使用。
199|a cultural exchange|exchange|交流；交换|a cultural exchange|一次文化交流|The festival offers a chance for a cultural exchange.|这个节日提供了一次文化交流的机会。|文化历史|日常聊天||cultural exchange 可指文化交流活动或过程。
199|foreign exchange|exchange|兑换；交流|foreign exchange|外汇|The bank provides foreign exchange services.|这家银行提供外汇服务。|金钱消费|出行问路||foreign exchange 在这里不是国外交换生，而是外汇。
200|make out a receipt|receipt|收据|make out a receipt|开收据|Could you make out a receipt for me?|你能给我开一张收据吗？|金钱消费|点餐购物||make out 在这里指开具或填写。
200|impose a levy on sth.|levy|税款；征收|impose a levy on plastic bags|对塑料袋征税|The city may impose a levy on plastic bags.|这座城市可能对塑料袋征税。|社会发展|课堂讨论|on|impose a levy on + 征收对象。
200|be exempt from duty|exempt|获豁免的|be exempt from duty|免征关税|These goods may be exempt from duty.|这些货物可能免征关税。|社会发展|课堂讨论|from|be exempt from + 税款、规则或义务。
200|impose a penalty|penalty|处罚；罚金|impose a penalty|施加处罚|The regulator can impose a penalty.|监管机构可以施加处罚。|社会发展|课堂讨论||impose a penalty on + 受处罚对象。
200|spend time/money on sth.|spend|花费|spend money on books|花钱买书|I try not to spend money on books I won't read.|我尽量不花钱买自己不会读的书。|金钱消费|日常聊天|on|spend 时间或金钱 on + 名词；spend 时间 doing。
200|spend time/money (in) doing sth.|spend|花费|spend time reading|花时间阅读|I'd like to spend time reading every day.|我想每天花时间阅读。|教育学习|日常聊天||spend time doing，不用 spend time to do。
200|at a cost of|cost|成本；代价|at a cost of ten pounds|以十英镑的费用|You can join the workshop at a cost of ten pounds.|你可以花十英镑参加研讨活动。|金钱消费|点餐购物|at|at a cost of + 具体费用。
200|the cost of living|cost|费用；成本|the cost of living|生活成本|Many students worry about the cost of living.|许多学生担心生活成本。|金钱消费|租房入住|of|cost 在此不加 s；注意整个固定词块。
200|tax revenue|revenue|收入；财政收入|tax revenue|税收收入|The policy could increase tax revenue.|这项政策可能增加税收收入。|社会发展|课堂讨论||revenue 通常不可数。
201|clear a debt|debt|债务|clear a debt|还清债务|It took him a year to clear a debt.|他花了一年还清一笔债务。|金钱消费|日常聊天||debt 的 b 不发音；clear 在这里表示清偿。
201|dwindle away|dwindle|逐渐减少|dwindle away|逐渐消失|Their savings began to dwindle away.|他们的积蓄开始逐渐减少。|金钱消费|日常聊天|away|dwindle 表示逐渐减少，away 强调减少到接近没有。
254|react to|react|反应|react to the news|对这个消息作出反应|How did you react to the news?|你对这个消息作出了怎样的反应？|人际表达|日常聊天|to|react to + 引发反应的事物。
254|bear responsibility for|responsibility|责任|bear responsibility for the mistake|为这个错误负责|We all bear responsibility for the mistake.|我们都要为这个错误负责。|工作职场|工作协作|for|bear responsibility for + 负责的事情。
254|mow the lawn|lawn|草坪|mow the lawn|修剪草坪|I need to mow the lawn this weekend.|我这周末需要修剪草坪。|居家生活|日常聊天||mow 是修剪草的动词；不用 cut the lawn 来回忆本题目标。
255|dietary intake|intake|摄取量|dietary intake|饮食摄取量|The study measured dietary intake.|这项研究测量了饮食摄取量。|健康身体|课堂讨论||intake 作名词，常与 dietary 或 caloric 连用。
255|caloric intake|caloric|热量的|caloric intake|热量摄取量|The report discusses average caloric intake.|这份报告讨论平均热量摄取量。|健康身体|课堂讨论||这里只练习报告表达，不提供饮食建议。
255|get a glimpse of|get|获得；看到|get a glimpse of the sea|瞥见大海|We might get a glimpse of the sea from the train.|我们可能从火车上瞥见大海。|交通出行|出行问路|of|a glimpse of 是短暂看到；get a glimpse of 连起来记。
255|at first glance|glance|一瞥|at first glance|乍一看|The task looks easy at first glance.|这项任务乍一看很简单。|人际表达|日常聊天|at|at first glance 作为完整状语练习。
255|stare at|stare|盯着看|stare at the screen|盯着屏幕看|Try not to stare at the screen for too long.|尽量不要长时间盯着屏幕看。|科技数字|数字生活|at|stare at 凝视；glance at 瞥一眼。
256|take an oath|oath|誓言|take an oath|宣誓|New members are asked to take an oath.|新成员被要求宣誓。|社会发展|课堂讨论||take an oath 和 swear an oath 都表示宣誓。
256|quarrel with|quarrel|争吵|quarrel with my brother|和我哥哥争吵|I don't want to quarrel with my brother.|我不想和我哥哥争吵。|人际表达|日常聊天|with|quarrel with 人；quarrel about/over 争吵的事情。
256|at the mention of|mention|提到|at the mention of her name|一提到她的名字|He smiled at the mention of her name.|一提到她的名字，他就笑了。|人际表达|日常聊天|at|at the mention of + 被提到的内容。
257|urge sb. to do sth.|urge|敦促|urge people to recycle|敦促人们回收利用|The campaign aims to urge people to recycle.|这项活动旨在敦促人们回收利用。|自然环境|课堂讨论|to|urge someone to do；宾语和 to 都不能漏。
257|a mock exam|mock|模拟的；嘲笑|a mock exam|一次模拟考试|We have a mock exam next week.|我们下周有一次模拟考试。|教育学习|课堂讨论||mock 在此为形容词；mock test 也常见。
257|get in touch with|get|取得；变得|get in touch with my tutor|与我的导师取得联系|I need to get in touch with my tutor.|我需要与我的导师取得联系。|教育学习|留学申请|with|get in touch with 强调取得联系；keep in touch with 强调保持。
257|keep in touch with|touch|联系；触摸|keep in touch with old friends|与老朋友保持联系|I try to keep in touch with old friends.|我努力与老朋友保持联系。|人际表达|日常聊天|with|keep in touch with + 联系的对象。
257|clap hands|clap|拍手|clap hands|拍手|The children began to clap hands.|孩子们开始拍手。|人际表达|日常聊天||clap hands 是动词搭配，注意 clap 的拼写。
257|boast about|boast|夸耀|boast about his achievements|夸耀他的成就|He likes to boast about his achievements.|他喜欢夸耀自己的成就。|人际表达|日常聊天|about|boast about + 所夸耀的事物。
258|catch up on|catch|赶上；补上|catch up on my reading|补上落下的阅读|I need to catch up on my reading.|我需要补上落下的阅读。|教育学习|日常聊天|on|catch up on 补做或了解近况；catch up with 追上某人。
258|follow suit|suit|一套；适合|follow suit|照着做|Other companies may follow suit.|其他公司可能会照着做。|工作职场|工作协作||follow suit 是固定习语，suit 不是这里的西装。
258|in the grip of|grip|紧握；控制|in the grip of a crisis|深陷危机|The town was in the grip of a crisis.|这座城镇深陷危机。|社会发展|课堂讨论|in|in the grip of 表示受到强烈控制或影响。
258|mess up|mess|弄乱；混乱|mess up my notes|弄乱我的笔记|Please don't mess up my notes.|请不要弄乱我的笔记。|居家生活|日常聊天|up|mess something up；代词放中间，如 mess it up。
259|wipe away|wipe|擦；抹去|wipe away the dust|擦去灰尘|Use a soft cloth to wipe away the dust.|用软布擦去灰尘。|居家生活|日常聊天|away|wipe away 擦去；与物体表面有关的 wipe off 也常见。
259|shake hands with|shake|摇动；握手|shake hands with the host|与主人握手|It's polite to shake hands with the host.|与主人握手是一种礼貌。|人际表达|日常聊天|with|shake hands 用复数 hands；with 后接握手对象。
277|absence of mind|absence|缺席；缺乏|absence of mind|心不在焉|The mistake was due to absence of mind.|这个错误是心不在焉造成的。|人际表达|日常聊天|of|absence of mind 指注意力不集中，不是没有想法。
278|by word of mouth|mouth|嘴；口头表达|by word of mouth|通过口头传播|Most customers hear about us by word of mouth.|大部分顾客通过口口相传听说我们。|工作职场|工作协作|by|by word of mouth 作为完整词块，不加 a。
278|a slip of the tongue|tongue|舌头；语言|a slip of the tongue|一次口误|It was just a slip of the tongue.|那只是一次口误。|人际表达|日常聊天|of|slip 在这里不是滑倒，而是无意中的小错误。
278|a tongue-twister|tongue|舌头|a tongue-twister|一个绕口令|Could you teach me a tongue-twister?|你能教我一个绕口令吗？|教育学习|日常聊天||连字符把两个词连接起来；也常见不带连字符的写法。
278|shoulder responsibility|shoulder|肩膀；承担|shoulder responsibility|承担责任|Everyone needs to shoulder responsibility.|每个人都需要承担责任。|工作职场|工作协作||shoulder 在这里是动词，表示承担。
278|an artificial limb|artificial|人工的|an artificial limb|一只假肢|The engineer is developing an artificial limb.|这位工程师正在研发一只假肢。|科技数字|课堂讨论||artificial 人造的；注意开头元音音素前用 an。
280|ankle joint|ankle|脚踝|the ankle joint|踝关节|The diagram shows the ankle joint.|这幅图展示踝关节。|健康身体|看病就诊||ankle 脚踝，joint 关节。
280|ankle socks|ankle|脚踝|ankle socks|短袜|I bought a pair of ankle socks.|我买了一双短袜。|饮食消费|点餐购物||a pair of + 复数 socks 表示一双袜子。
280|from tip to toe|tip|尖端|from tip to toe|从头到脚|She was covered in paint from tip to toe.|她从头到脚都沾满了颜料。|人际表达|日常聊天|from|from tip to toe 是整体表达，不逐字翻译。
292|delight in|delight|以……为乐；喜悦|delight in small things|以小事为乐|We can learn to delight in small things.|我们可以学着以小事为乐。|人际表达|日常聊天|in|delight in + 名词或 doing。
292|cheer up|cheer|振奋；欢呼|cheer up|振作起来|A short walk might help me cheer up.|散一会儿步也许能帮我振作起来。|人际表达|日常聊天|up|cheer up 也可接人，cheer someone up。
293|ask a favour of sb.|favour|帮助；好意|ask a favour of you|请你帮个忙|Could I ask a favour of you?|我可以请你帮个忙吗？|人际表达|日常聊天|of|favour 英式拼写；美式为 favor。
293|liberal arts|liberal|文科的；开明的|liberal arts|文科；博雅学科|She studied liberal arts at university.|她在大学学习文科。|教育学习|留学申请||liberal arts 通常使用复数形式 arts。
294|be proud of|proud|自豪的|be proud of my progress|为我的进步感到自豪|I'd like to be proud of my progress.|我希望能为自己的进步感到自豪。|人际表达|日常聊天|of|be proud of + 人或事物；pride 是名词。
295|a rational suggestion|rational|合理的；理性的|a rational suggestion|一个合理的建议|That sounds like a rational suggestion.|那听起来是一个合理的建议。|工作职场|工作协作||rational 强调有理性或逻辑依据。
295|a stern warning|stern|严厉的|a stern warning|一次严正警告|The manager issued a stern warning.|经理发出了严正警告。|工作职场|工作协作||stern 修饰 warning，表示严厉郑重的语气。
295|be concerned about|concern|关心；担心|be concerned about the environment|关心环境|We should be concerned about the environment.|我们应该关心环境。|自然环境|课堂讨论|about|be concerned about + 关心或担心的事情。
295|everyday concerns|concern|关切；事务|everyday concerns|日常事务|The book discusses everyday concerns.|这本书讨论日常事务。|人际表达|日常聊天||everyday 作形容词；every day 表示每天。
308|daily life|daily|日常的；每日的|daily life|日常生活|Technology affects our daily life.|科技影响我们的日常生活。|科技数字|日常聊天||daily life 是整体词块；daily 也可用作副词。
308|annual bonus|annual|每年的|an annual bonus|年终奖金|The company offers an annual bonus.|这家公司提供年终奖金。|工作职场|面试沟通||annual 强调每年一次；前用 an。
308|annual earnings|earnings|收入|annual earnings|年收入|The report compares annual earnings.|这份报告比较年收入。|金钱消费|工作协作||earnings 为复数形式，指所得收入。
308|at present|present|现在；礼物|at present|目前|I'm working from home at present.|我目前在家工作。|人际表达|日常聊天|at|at present 表示目前，不要误写成 at the present。
308|millions of|million|百万|millions of people|数百万人|The app is used by millions of people.|数百万人使用这个应用。|科技数字|课堂讨论|of|概数用 millions of；具体数字用 two million people。
309|at dawn|dawn|黎明|at dawn|在黎明时|We plan to leave at dawn.|我们打算黎明时出发。|交通出行|出行问路|at|具体时点类表达 at dawn，at noon，at midnight。
309|day and night|night|夜晚|day and night|日夜|The station stays open day and night.|这座车站日夜开放。|交通出行|出行问路||固定顺序为 day and night。
310|at the moment|moment|片刻；时刻|at the moment|此刻；目前|I'm a little busy at the moment.|我这会儿有点忙。|人际表达|日常聊天|at|at the moment 眼下；in a moment 一会儿后。
310|in a moment|moment|片刻|in a moment|一会儿后|I'll be back in a moment.|我一会儿就回来。|人际表达|日常聊天|in|in + 一段时间，表示从现在起过这段时间。
310|in a minute|minute|分钟|in a minute|马上；一会儿后|I'll call you in a minute.|我马上给你打电话。|人际表达|日常聊天|in|in a minute 在口语中不一定精确等于六十秒。
310|wait a minute|wait|等待|wait a minute|等一下|Could you wait a minute?|你能等一下吗？|人际表达|日常聊天||wait a minute，不用 wait for a minute 回忆本题词块。
310|prior to|prior|在前的|prior to departure|出发之前|Please check your documents prior to departure.|请在出发前检查证件。|交通出行|出行问路|to|prior to 较正式，相当于 before；to 是介词。
310|in the midst of|midst|中间|in the midst of a discussion|正在讨论之中|We were in the midst of a discussion.|我们正在讨论之中。|工作职场|工作协作|in|in the midst of + 名词或 doing。
60|to a certain degree|degree|程度；学位|to a certain degree|在一定程度上|I agree with you to a certain degree.|我在一定程度上同意你的看法。|人际表达|课堂讨论|to|to a certain degree 作为完整状语，常用于限定观点。
60|qualify sb. for sth.|qualify|使具备资格|qualify you for the job|使你符合这份工作的要求|This certificate could qualify you for the job.|这份证书可能使你符合这份工作的要求。|工作职场|面试沟通|for|qualify someone for something；注意对象和介词。
60|a driving license|license|执照|a driving licence|一本驾驶执照|Do you have a driving licence?|你有驾驶执照吗？|交通出行|日常聊天||英式名词常拼 licence，美式为 license；本题使用英式。
60|graduate from|graduate|毕业|graduate from university|大学毕业|I hope to graduate from university next year.|我希望明年大学毕业。|教育学习|留学申请|from|graduate from + 学校。
60|the opening ceremony|ceremony|仪式|the opening ceremony|开幕式|We watched the opening ceremony together.|我们一起观看了开幕式。|文化历史|日常聊天||opening ceremony 开幕式；closing ceremony 闭幕式。
60|the closing ceremony|ceremony|仪式|the closing ceremony|闭幕式|Will you attend the closing ceremony?|你会参加闭幕式吗？|文化历史|日常聊天||注意 ceremony 的拼写和单复数。
60|a bachelor's degree|bachelor|学士|a bachelor's degree|一个学士学位|She has a bachelor's degree in physics.|她拥有物理学学士学位。|教育学习|留学申请||保留 bachelor's 中的所有格 's。
60|a Master of Arts|master|硕士|a Master of Arts|一个文学硕士学位|She completed a Master of Arts last year.|她去年取得了文学硕士学位。|教育学习|留学申请|of|Master of Arts 常缩写为 MA。
60|a Master of Science|master|硕士|a Master of Science|一个理学硕士学位|He plans to study for a Master of Science.|他打算攻读理学硕士学位。|教育学习|留学申请|of|Master of Science 常缩写为 MSc。
61|junior high school|junior|初级的|junior high school|初中|I started learning French in junior high school.|我在初中开始学法语。|教育学习|日常聊天||这是美式学段表达。
61|senior high school|senior|高级的；高年级的|senior high school|高中|We met in senior high school.|我们在高中相识。|教育学习|日常聊天||和 junior high school 对照记忆。
61|live on campus|campus|校园|live on campus|住在校内|I'd prefer to live on campus in my first year.|我第一年更想住在校内。|居家生活|留学申请|on|live on campus 校内；live off campus 校外。
61|live off campus|campus|校园|live off campus|住在校外|Is it cheaper to live off campus?|住在校外更便宜吗？|居家生活|租房入住|off|这里 off 表示离开校园范围，和 on 对照。
61|enrol on a course|enrol|注册入学|enrol on a course|注册一门课程|How can I enrol on a course?|我如何注册一门课程？|教育学习|留学申请|on|英式常用 enrol on a course；美式常写 enroll in。
62|do an experiment|experiment|实验|do an experiment|做实验|We will do an experiment in class tomorrow.|我们明天会在课堂上做实验。|教育学习|课堂讨论||do an experiment；conduct an experiment 是更正式的表达。
63|make a long story short|story|故事|to make a long story short|长话短说|Well, to make a long story short, we missed the train.|嗯，长话短说，我们错过了火车。|人际表达|日常聊天|to|这是开头用的固定话语表达。
63|tell a story|story|故事|tell a story|讲一个故事|Could you tell a story about your childhood?|你能讲一个童年故事吗？|人际表达|日常聊天||tell a story 讲故事；说谎通常更直接说 tell a lie。
68|divide A by B|divide|除；分开|divide ten by two|十除以二|If you divide ten by two, you get five.|如果你用十除以二，就得到五。|教育学习|课堂讨论|by|divide A by B 是 A 除以 B，注意顺序。
68|mean distance|mean|平均的；意思是|the mean distance|平均距离|The chart shows the mean distance travelled.|图表展示平均行进距离。|教育学习|课堂讨论||mean 在此为平均的，和表示含义的 mean 不同。
69|an ice cube|cube|立方体；方块|an ice cube|一块冰块|Could you add an ice cube to my drink?|你能给我的饮料加一块冰吗？|饮食消费|点餐购物||一块用 an ice cube，多块用 ice cubes。
70|come straight to the point|point|要点；点|come straight to the point|开门见山|Let me come straight to the point.|让我开门见山地说吧。|工作职场|工作协作|to|the point 指要点，保留 the。
70|to some extent|extent|程度；范围|to some extent|在某种程度上|This explanation is true to some extent.|这个解释在某种程度上是正确的。|人际表达|课堂讨论|to|to some extent 可用于表达有保留的同意。
70|a decimal point|decimal|小数的|a decimal point|一个小数点|The number is missing a decimal point.|这个数字少了一个小数点。|教育学习|课堂讨论||decimal point 小数点，不是逗号。
71|in direct ratio|ratio|比率|in direct ratio|成正比|The quantities increase in direct ratio.|这些量成正比增加。|教育学习|课堂讨论|in|direct ratio 正比例；inverse ratio 反比例。
71|in inverse ratio|ratio|比率|in inverse ratio|成反比|The two quantities vary in inverse ratio.|这两个量成反比变化。|教育学习|课堂讨论|in|inverse 表示反向的，与 direct 对照。
71|on a large scale|scale|规模；刻度|on a large scale|大规模地|The company produces batteries on a large scale.|这家公司大规模生产电池。|社会发展|课堂讨论|on|on a large scale 作状语；large-scale 作定语。
72|ozone layer|ozone|臭氧|the ozone layer|臭氧层|The lesson explains why the ozone layer matters.|这节课解释臭氧层为何重要。|自然环境|课堂讨论||通常说 the ozone layer，保留定冠词。
72|family friction|friction|摩擦；不和|family friction|家庭摩擦|Money can sometimes cause family friction.|金钱有时会引起家庭摩擦。|人际表达|日常聊天||friction 在这里指关系中的冲突。
72|boil down to|boil|煮沸；归结|boil down to a lack of time|归结为时间不足|The problem seems to boil down to a lack of time.|这个问题似乎归结为时间不足。|工作职场|工作协作|to|boil down to + 核心原因；是比喻用法。
73|acid rain|acid|酸；酸性的|acid rain|酸雨|The report discusses the effects of acid rain.|报告讨论酸雨的影响。|自然环境|课堂讨论||acid rain 通常不用复数。
73|blend sth. with sth.|blend|混合；融合|blend modern design with tradition|将现代设计与传统融合|The architect hopes to blend modern design with tradition.|这位建筑师希望将现代设计与传统融合。|文化历史|课堂讨论|with|blend A with B：把 A 与 B 融合。
73|be inherent in|inherent|固有的|be inherent in the system|为这个系统所固有|Some risks may be inherent in the system.|有些风险可能是这个系统固有的。|科技数字|课堂讨论|in|inherent 通常和 in 搭配。
73|be composed of|compose|组成；创作|be composed of three parts|由三部分组成|The course will be composed of three parts.|这门课程将由三部分组成。|教育学习|课堂讨论|of|be composed of 由……组成；compose 作曲是另一个义项。
260|collide with|collide|相撞；冲突|collide with another vehicle|与另一辆车相撞|The car could collide with another vehicle.|这辆车可能与另一辆车相撞。|交通出行|课堂讨论|with|collide with + 相撞对象，也可比喻观点冲突。
260|be in contact with|contact|联系；接触|be in contact with the team|与团队保持联系|I need to be in contact with the team.|我需要与团队保持联系。|工作职场|工作协作|with|contact 作名词时常用 in contact with；动词 contact 后直接接人。
260|lose contact with|contact|联系；接触|lose contact with my friends|与朋友失去联系|I don't want to lose contact with my friends.|我不想与朋友失去联系。|人际表达|日常聊天|with|lose contact with 与……失去联系。
260|connect A to/with B|connect|连接|connect the laptop to the monitor|把笔记本电脑连接到显示器|Please connect the laptop to the monitor.|请把笔记本电脑连接到显示器。|科技数字|数字生活|to|connect A to B：连接两个设备。
260|integrate A into/with B|integrate|融入；整合|integrate exercise into daily life|将锻炼融入日常生活|We can integrate exercise into daily life.|我们可以将锻炼融入日常生活。|健康身体|日常聊天|into|integrate A into B：把 A 融入 B。
260|insert A in/into B|insert|插入|insert the card into the machine|把卡插入机器|Please insert the card into the machine.|请把卡插入机器。|科技数字|数字生活|into|insert A into B；注意不是 insert to。
261|You bet!|bet|肯定；打赌|You bet|当然|You bet! I'd love to join you.|当然！我很愿意和你一起去。|人际表达|日常聊天||这是口语中热情肯定的回答；本题忽略标点。
261|at stake|stake|风险；赌注|at stake|处于风险中|Our reputation is at stake.|我们的声誉正处于风险中。|工作职场|工作协作|at|at stake 常与利益、声誉、安全等连用。
261|break a promise|promise|承诺|break a promise|违背承诺|I don't want to break a promise.|我不想违背承诺。|人际表达|日常聊天||break a promise 违背；keep a promise 遵守。
261|keep a promise|promise|承诺|keep a promise|遵守承诺|It's important to keep a promise.|遵守承诺很重要。|人际表达|日常聊天||promise 前面的 a 在本题中保留。
261|promise to do sth.|promise|承诺|promise to call|承诺打电话|Please don't promise to call if you won't.|如果你不会打，就请别承诺打电话。|人际表达|日常聊天|to|promise to do，不是 promise doing。
261|attract sb.'s attention|attention|注意力|attract people's attention|吸引人们的注意力|The bright sign can attract people's attention.|这个明亮的标志能吸引人们的注意力。|科技数字|课堂讨论||attention 通常不可数，不加 s。
261|be obsessed with|obsess|使着迷|be obsessed with perfection|痴迷于完美|It's easy to be obsessed with perfection.|人很容易痴迷于完美。|人际表达|日常聊天|with|be obsessed with 表示强烈着迷，不是一般感兴趣。
262|be/get involved in sth.|involve|参与；涉及|get involved in community activities|参与社区活动|I'd like to get involved in community activities.|我想参与社区活动。|人际表达|日常聊天|in|get involved in 强调开始参与；be involved in 强调状态。
262|involve sb. in doing sth.|involve|使参与|involve students in planning|让学生参与规划|The project will involve students in planning.|这个项目会让学生参与规划。|教育学习|课堂讨论|in|involve someone in doing；in 后接 doing。
262|in disregard of|disregard|无视|in disregard of the rules|无视规则|He acted in disregard of the rules.|他无视规则行事。|社会发展|课堂讨论|of|较正式的表达，disregard 可作名词或动词。
262|be in ignorance of|ignorance|不知情；无知|be in ignorance of the facts|对事实毫不知情|We may be in ignorance of the facts.|我们可能对事实毫不知情。|社会发展|课堂讨论|of|be in ignorance of + 不知道的内容。
263|have a bias against|bias|偏见；偏好|have a bias against older workers|对年长员工有偏见|Some employers have a bias against older workers.|有些雇主对年长员工有偏见。|社会发展|课堂讨论|against|bias against 不利偏见；bias toward 偏向。
263|have a bias toward|bias|偏见；偏好|have a bias toward familiar ideas|偏向熟悉的想法|People often have a bias toward familiar ideas.|人们常常偏向熟悉的想法。|社会发展|课堂讨论|toward|toward 后接偏向的对象。
264|induce sb. to do sth.|induce|促使；劝使|induce people to change|促使人们改变|Higher prices may induce people to change their habits.|更高的价格可能促使人们改变习惯。|社会发展|课堂讨论|to|induce someone to do，较正式。
264|resist temptation|temptation|诱惑|resist temptation|抵制诱惑|I find it hard to resist temptation when shopping.|购物时，我发现自己很难抵制诱惑。|饮食消费|点餐购物||resist 后接名词或 doing，不加 to。
264|assign sb. to do sth.|assign|指派；分配|assign someone to take notes|指派一个人记笔记|We should assign someone to take notes.|我们应该指派一个人记笔记。|工作职场|工作协作|to|assign someone to do：指派某人做某事。
264|assign sth. to sb.|assign|分配|assign the task to me|把任务分配给我|You can assign the task to me.|你可以把任务分配给我。|工作职场|工作协作|to|assign something to someone；注意两个宾语的顺序。
264|distribute sth. among|distribute|分发|distribute the books among the students|把书分发给学生们|Please distribute the books among the students.|请把书分发给学生们。|教育学习|课堂讨论|among|among 强调在一个群体中分配。
265|in disguise|disguise|伪装|in disguise|伪装着|The character enters the city in disguise.|这个角色伪装着进入城市。|文化历史|日常聊天|in|in disguise 作状语或表语，固定介词为 in。
265|conceal your intentions|conceal|隐藏|conceal your intentions|隐藏你的意图|It can be difficult to conceal your intentions.|隐藏你的意图可能很困难。|人际表达|日常聊天||conceal 后直接接宾语。
265|convince sb. of sth.|convince|使相信|convince them of the benefits|让他们相信这些好处|We need to convince them of the benefits.|我们需要让他们相信这些好处。|工作职场|工作协作|of|convince someone of something；也可 convince someone that…。 
266|make a wish|wish|愿望；希望|make a wish|许愿|Close your eyes and make a wish.|闭上眼睛，许个愿。|人际表达|日常聊天||make a wish 中 a 不省略。
266|aspire to do sth.|aspire|渴望；立志|aspire to become a teacher|立志成为教师|I aspire to become a teacher.|我立志成为教师。|工作职场|面试沟通|to|aspire to do 较正式，表达志向。
266|yearn for|yearn|渴望|yearn for a quieter life|渴望更安静的生活|Many people yearn for a quieter life.|许多人渴望更安静的生活。|人际表达|日常聊天|for|yearn for + 名词，情感比 want 更强。
266|itch for|itch|渴望；发痒|itch for a chance to travel|渴望一次旅行机会|I itch for a chance to travel.|我渴望一次旅行机会。|人际表达|日常聊天|for|itch for 表示迫切想要，较口语。
266|attempt to do sth.|attempt|尝试|attempt to solve the problem|尝试解决问题|We will attempt to solve the problem together.|我们会一起尝试解决问题。|工作职场|工作协作|to|动词 attempt to do；名词 an attempt at doing。
266|attempt at doing sth.|attempt|尝试|an attempt at solving the problem|一次解决问题的尝试|This is an attempt at solving the problem.|这是一次解决问题的尝试。|工作职场|工作协作|at|attempt 作名词时可搭配 at doing。
266|strive for|strive|努力争取|strive for improvement|努力争取进步|We should strive for improvement every day.|我们应该每天努力争取进步。|教育学习|日常聊天|for|strive for + 目标；strive to do 也常见。
266|make great efforts to do sth.|effort|努力|make great efforts to improve|付出很大努力去改进|We continue to make great efforts to improve.|我们继续付出很大努力去改进。|工作职场|工作协作|to|efforts 在本搭配中用复数。
266|sort of|sort|种类|sort of tired|有点累|I'm sort of tired today.|我今天有点累。|人际表达|日常聊天|of|sort of 在口语中可表示有点，不一定指种类。
267|exert an influence on|exert|施加|exert an influence on children|对儿童产生影响|Parents exert an influence on children.|父母对儿童产生影响。|教育学习|课堂讨论|on|exert an influence on + 影响对象。
267|tackle the problem|tackle|处理；应对|tackle the problem|处理这个问题|We need to tackle the problem early.|我们需要尽早处理这个问题。|工作职场|工作协作||tackle 后直接接 problem，不加 with。
267|cope with|cope|应对|cope with change|应对变化|It takes time to cope with change.|应对变化需要时间。|人际表达|日常聊天|with|cope with + 困难或变化。
267|dispose of sth.|dispose|处理|dispose of waste|处理废弃物|How does the town dispose of waste?|这座城镇如何处理废弃物？|自然环境|课堂讨论|of|dispose of 为整体动词搭配，不省略 of。
267|delete sth. from|delete|删除|delete my name from the list|从名单里删除我的名字|Please delete my name from the list.|请从名单里删除我的名字。|科技数字|数字生活|from|delete A from B：从 B 中删除 A。
267|cancel an appointment|cancel|取消|cancel an appointment|取消预约|Is there a fee to cancel an appointment?|取消预约需要付费吗？|健康身体|看病就诊||cancel 后直接接宾语，不加介词。
267|clear up|clear|清理；澄清|clear up the confusion|澄清误解|A short email could clear up the confusion.|一封简短的邮件就可能澄清误解。|工作职场|工作协作|up|clear up 既可清理，也可澄清不明之处。
268|obtain employment|obtain|获得|obtain employment|找到工作|The programme helps graduates obtain employment.|这个项目帮助毕业生找到工作。|工作职场|面试沟通||obtain employment 较正式；日常可说 find a job。
268|in short supply|supply|供应|in short supply|供应短缺|Affordable housing is in short supply.|价格可负担的住房供应短缺。|社会发展|课堂讨论|in|be in short supply 表示供不应求。
268|supply sth. to|supply|提供；供应|supply water to the village|向村庄供水|The system will supply water to the village.|这个系统将向村庄供水。|社会发展|课堂讨论|to|supply 物 to 人或地方。
268|supply sb. with|supply|提供；供应|supply students with textbooks|向学生提供课本|The school will supply students with textbooks.|学校将向学生提供课本。|教育学习|课堂讨论|with|supply 人 with 物；和 supply 物 to 人对照。
269|enlarge the font|font|字体|enlarge the font|放大字体|Could you enlarge the font on this page?|你能放大这页的字体吗？|科技数字|数字生活||enlarge 放大；font 字体，和 front（前面）区分。
269|uphold the law|uphold|维护|uphold the law|维护法律|Public officials should uphold the law.|公职人员应该维护法律。|社会发展|课堂讨论||uphold 后直接接宾语。
269|raise a price|raise|提高；筹集|raise a price|提高价格|The shop may raise a price without warning.|这家店可能在没有预告的情况下提高某项价格。|金钱消费|点餐购物||raise 是及物动词；rise 是不及物动词。
269|raise capital|capital|资本；首都|raise capital|筹集资本|The business needs to raise capital.|这家企业需要筹集资本。|金钱消费|工作协作||capital 这里是资本，不是首都。
269|raise sb.'s awareness of|awareness|意识；认识|raise public awareness of recycling|提高公众的回收意识|The campaign aims to raise public awareness of recycling.|活动旨在提高公众的回收意识。|自然环境|课堂讨论|of|raise awareness of + 让人认识到的事情。
269|spill over|spill|溢出；波及|spill over into other areas|波及其他领域|The effects may spill over into other areas.|这些影响可能波及其他领域。|社会发展|课堂讨论|into|spill over 是溢出或蔓延；into 后接波及领域。
270|for the sake of|sake|缘故；利益|for the sake of clarity|为了清楚起见|I'll use a simple example for the sake of clarity.|为了清楚起见，我会用一个简单的例子。|工作职场|工作协作|for|for the sake of + 目的或某人的利益。
270|on purpose|purpose|目的|on purpose|故意地|I didn't do it on purpose.|我不是故意的。|人际表达|日常聊天|on|on purpose 故意；by accident 偶然。
270|for the purpose of|purpose|目的|for the purpose of training|为了培训|This room is used for the purpose of training.|这个房间用于培训。|工作职场|工作协作|for|for the purpose of 后接名词或 doing。
271|arouse sb.'s interest|arouse|激起|arouse students' interest|激发学生的兴趣|Stories can arouse students' interest.|故事能激发学生的兴趣。|教育学习|课堂讨论||arouse interest 激发兴趣；students' 是复数所有格。
271|a drop in the bucket|drop|滴；下降|a drop in the bucket|杯水车薪；九牛一毛|This donation is a drop in the bucket.|这笔捐款只是杯水车薪。|社会发展|课堂讨论|in|习语，不按水滴和桶逐字翻译。
272|welcome aboard|aboard|在交通工具上；加入|Welcome aboard|欢迎加入|Welcome aboard! We're happy to have you on the team.|欢迎加入！我们很高兴你加入团队。|工作职场|面试沟通||可用于欢迎乘客，也可欢迎新同事。
272|participate in|participate|参与|participate in a local event|参与当地活动|Would you like to participate in a local event?|你想参与一项当地活动吗？|人际表达|日常聊天|in|participate in 后接活动。
272|a farewell address|farewell|告别|a farewell address|一篇告别演说|She gave a farewell address to the team.|她向团队发表了告别演说。|工作职场|工作协作||address 在这里为演说，不是地址。
272|correspond with sb.|correspond|通信；相符|correspond with a researcher|与一位研究者通信|I sometimes correspond with a researcher abroad.|我有时与一位国外研究者通信。|教育学习|留学申请|with|correspond with 人表示通信；correspond to 可表示相符。
272|attribute sth. to|attribute|归因于|attribute my progress to practice|把我的进步归因于练习|I attribute my progress to practice.|我把自己的进步归因于练习。|教育学习|日常聊天|to|attribute A to B：把 A 归因于 B。
273|remind sb. of|remind|提醒；使想起|remind me of home|让我想起家|These meals remind me of home.|这些饭菜让我想起家。|人际表达|日常聊天|of|remind someone of something；与提醒去做的 to do 区分。
273|remind sb. to do sth.|remind|提醒|remind me to reply|提醒我回复|Please remind me to reply tonight.|请提醒我今晚回复。|人际表达|日常聊天|to|remind someone to do，指提醒尚未做的事。
273|replace A with B|replace|替换|replace sugar with honey|用蜂蜜替代糖|You can replace sugar with honey in this recipe.|在这个食谱里，你可以用蜂蜜替代糖。|饮食消费|点餐购物|with|replace A with B：被替换的是 A，新用的是 B。
274|substitute A for B|substitute|替代|substitute honey for sugar|用蜂蜜替代糖|Could I substitute honey for sugar?|我可以用蜂蜜替代糖吗？|饮食消费|点餐购物|for|substitute A for B：新用 A，替换 B；和 replace A with B 顺序不同。
274|lean on|lean|依靠；倾斜|lean on my friends|依靠我的朋友|I know I can lean on my friends.|我知道自己可以依靠朋友。|人际表达|日常聊天|on|lean on 可指情感上依靠，也可指身体倚靠。
274|lean toward|lean|倾向于；倾斜|lean toward the second option|倾向于第二个选项|I lean toward the second option.|我倾向于第二个选项。|工作职场|工作协作|toward|lean toward 表达初步倾向，语气较留有余地。
281|immune to|immune|免疫的；不受影响的|immune to criticism|不受批评影响|No one is completely immune to criticism.|没有人完全不受批评影响。|人际表达|日常聊天|to|immune to 既可说免疫，也可比喻不受影响。
281|immune system|immune|免疫的|the immune system|免疫系统|The diagram explains the immune system.|这幅图解释免疫系统。|健康身体|课堂讨论||这是语言知识练习，不用例句作诊疗依据。
281|acquire a habit of|habit|习惯|acquire a habit of reading|养成阅读习惯|I'd like to acquire a habit of reading every night.|我想养成每晚阅读的习惯。|教育学习|日常聊天|of|acquire a habit of doing；of 后接 doing。
282|fall asleep|asleep|睡着的|fall asleep|入睡|I find it hard to fall asleep after a late coffee.|喝了太晚的咖啡后，我发现自己很难入睡。|健康身体|日常聊天||fall asleep 表示入睡，be asleep 表示睡着的状态。
283|a pregnancy test|pregnancy|怀孕|a pregnancy test|一次验孕检测|The leaflet explains how a pregnancy test works.|传单解释验孕检测的原理。|健康身体|看病就诊||pregnancy 是名词；pregnant 是形容词。
283|cause a disease|disease|疾病|cause a disease|引起疾病|The lesson explains how a virus can cause a disease.|这节课解释病毒如何引起疾病。|健康身体|课堂讨论||cause 后直接接宾语。
283|recover from illness|illness|疾病|recover from illness|病后康复|It can take time to recover from illness.|病后康复可能需要时间。|健康身体|看病就诊|from|recover from + 疾病、伤害或挫折。
283|a bacterial infection|bacterial|细菌的|a bacterial infection|细菌感染|The report mentions a bacterial infection.|报告提到细菌感染。|健康身体|看病就诊||bacterial 细菌的；viral 病毒的。
287|be weary of|weary|厌倦的；疲倦的|be weary of endless meetings|厌倦无休止的会议|It's natural to be weary of endless meetings.|厌倦无休止的会议很正常。|工作职场|日常聊天|of|weary of 厌倦；weary from 因……疲惫。
287|a chronic disease|chronic|慢性的|a chronic disease|一种慢性病|The research focuses on a chronic disease.|这项研究关注一种慢性病。|健康身体|课堂讨论||chronic 指长期持续的，和 acute（急性的）区分。
288|a fitness centre|fitness|健身；健康|a fitness centre|一家健身中心|Is there a fitness centre near the flat?|公寓附近有健身中心吗？|健康身体|租房入住||centre 为英式拼写，center 为美式。
288|a school clinic|clinic|诊所；门诊部|a school clinic|一间学校医务室|You can ask at a school clinic.|你可以到学校医务室咨询。|健康身体|看病就诊||clinic 诊所，hospital 医院。
288|perform an operation|operation|手术；操作|perform an operation|实施手术|The surgeon will perform an operation tomorrow.|外科医生明天会实施手术。|健康身体|看病就诊||perform an operation 做手术；have an operation 接受手术。
289|give sb. an injection|injection|注射|give me an injection|给我打一针|Will the nurse give me an injection?|护士会给我打一针吗？|健康身体|看病就诊||give someone an injection；注意 an。
290|refresh sb.'s memory|memory|记忆|refresh my memory|唤起我的记忆|Could you refresh my memory about the plan?|你能帮我回忆一下那个计划吗？|人际表达|日常聊天||refresh someone's memory：使某人重新想起。
291|have a positive impact on|impact|影响|have a positive impact on learning|对学习有积极影响|Good feedback can have a positive impact on learning.|好的反馈可以对学习产生积极影响。|教育学习|课堂讨论|on|have a positive impact on + 影响对象。
291|have a negative impact on|impact|影响|have a negative impact on sleep|对睡眠有消极影响|Noise can have a negative impact on sleep.|噪音可能对睡眠产生消极影响。|健康身体|课堂讨论|on|positive 积极的；negative 消极的；介词都为 on。
291|passive smoking|passive|被动的|passive smoking|被动吸烟|The report discusses the risks of passive smoking.|报告讨论被动吸烟的风险。|健康身体|课堂讨论||passive smoking 指吸二手烟。
`.trim();
window.BOOK_LESSONS=[];
for(const row of BOOK_ROWS.split('\n')){
 const [page,reference,word,meaning,phrase,phraseZh,sentence,zh,theme,scene,prep,tip]=row.split('|');
 const bookPage=Number(page),bookChapter=[...window.BOOK_CHAPTERS].reverse().find(([p])=>bookPage>=p)?.[1]||'';
 const l={id:'book-'+page+'-'+phrase.toLowerCase().replace(/[^a-z0-9]+/g,'-'),word,meaning,phrase,phraseZh,sentence,zh,theme,scene,prep:prep||'',tip:tip||'把整个搭配连起来记。',bookPage,pdfPage:bookPage+11,bookChapter,reference,source:'book-adapted'};
 window.BOOK_LESSONS.push(l);
}
window.LESSONS.push(...window.BOOK_LESSONS);
