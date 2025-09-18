// Original default greetings data, used as a fallback if no admin data is in local storage.
const greetingsData = [
    {
        id: '1',
        text: 'С днем рождения! Желаю счастья, здоровья и успехов во всем! Пусть каждый день будет наполнен радостью и улыбками.',
        category: 'День рождения',
        tags: ['день рождения', 'поздравление', 'счастье', 'здоровье', 'успех', 'радость', 'улыбки', 'праздник'],
        image: '/birthday_card.png'
    },
    {
        id: '1a',
        text: 'Поздравляю с днем рождения! Пусть жизнь будет яркой, полной приятных сюрпризов и незабываемых моментов, а мечты сбываются с легкостью.',
        category: 'День рождения',
        tags: ['день рождения', 'поздравление', 'яркая жизнь', 'сюрпризы', 'моменты', 'радость', 'праздник', 'мечты'],
        image: '/birthday_card_2.png'
    },
    {
        id: '1b',
        text: 'С днем рождения! Желаю исполнения всех самых заветных желаний, любви, добра и процветания. Пусть каждый миг будет особенным!',
        category: 'День рождения',
        tags: ['день рождения', 'поздравление', 'желания', 'любовь', 'добро', 'процветание', 'праздник', 'особенный'],
        image: '/birthday_card_3.png'
    },
    {
        id: '1c',
        text: 'Пусть в день рождения сбываются мечты, а каждый новый год приносит только счастье и вдохновение, озаряя путь к новым вершинам.',
        category: 'День рождения',
        tags: ['день рождения', 'мечты', 'счастье', 'вдохновение', 'праздник', 'поздравление', 'вершины'],
        image: '/birthday_card_4.png'
    },
    {
        id: '2',
        text: 'Поздравляю с Новым годом! Пусть он принесет много радости, удачи и исполнения всех заветных желаний, наполнив дом теплом и светом!',
        category: 'Новый год',
        tags: ['новый год', 'поздравление', 'радость', 'удача', 'желания', 'праздник', 'зима', 'тепло', 'свет'],
        image: '/new_year_card.png'
    },
    {
        id: '2a',
        text: 'С Новым годом! Желаю, чтобы 365 дней были наполнены счастьем, любовью и волшебством, а каждое утро начинается с улыбки!',
        category: 'Новый год',
        tags: ['новый год', 'поздравление', 'счастье', 'любовь', 'волшебство', 'праздник', 'зима', 'улыбка'],
        image: '/new_year_card_2.png'
    },
    {
        id: '2b',
        text: 'Пусть Новый год будет щедрым на подарки, яркие впечатления и новые достижения, принося в вашу жизнь гармонию и успех!',
        category: 'Новый год',
        tags: ['новый год', 'подарки', 'впечатления', 'достижения', 'поздравление', 'праздник', 'гармония', 'успех'],
        image: '/new_year_card_3.png'
    },
    {
        id: '3',
        text: 'С 8 Марта! Пусть в душе всегда цветет весна, а каждый день будет наполнен любовью и вниманием, даря ощущение легкости и счастья.',
        category: '8 Марта',
        tags: ['8 марта', 'женский день', 'весна', 'любовь', 'внимание', 'поздравление', 'праздник', 'счастье'],
        image: '/womens_day_card.png'
    },
    {
        id: '3a',
        text: 'Милые дамы, с праздником 8 Марта! Желаю вам бесконечного счастья, красоты и исполнения всех желаний, сияйте ярче звезд!',
        category: '8 Марта',
        tags: ['8 марта', 'женский день', 'дамы', 'счастье', 'красота', 'желания', 'поздравление', 'сияние'],
        image: '/womens_day_card_2.png'
    },
    {
        id: '3b',
        text: 'С Международным женским днем! Пусть каждый день будет похож на праздник, полный цветов и улыбок, а сердце наполняется радостью.',
        category: '8 Марта',
        tags: ['8 марта', 'женский день', 'праздник', 'цветы', 'улыбки', 'поздравление', 'радость', 'сердце'],
        image: '/womens_day_card_3.png'
    },
    {
        id: '4',
        text: 'С 23 Февраля, настоящие мужчины! Желаем мужества, силы духа и верных друзей, пусть каждый ваш шаг будет уверенным.',
        category: '23 Февраля',
        tags: ['23 февраля', 'день защитника отечества', 'мужчинам', 'мужество', 'сила', 'друзья', 'поздравление', 'праздник', 'уверенность'],
        image: '/mens_day_card.png'
    },
    {
        id: '4a',
        text: 'Поздравляем с Днем защитника Отечества! Будьте всегда сильными, смелыми и решительными, достойными сыновьями своей Отчизны.',
        category: '23 Февраля',
        tags: ['23 февраля', 'день защитника отечества', 'мужчинам', 'сильные', 'смелые', 'решительные', 'поздравление', 'Отчизна'],
        image: '/mens_day_card_2.png'
    },
    {
        id: '4b',
        text: 'С 23 Февраля! Желаю крепкого здоровья, бодрости духа и мирного неба над головой, пусть удача сопутствует во всем!',
        category: '23 Февраля',
        tags: ['23 февраля', 'день защитника отечества', 'мужчинам', 'здоровье', 'бодрость', 'мирное небо', 'поздравление', 'удача'],
        image: '/mens_day_card_3.png'
    },
    {
        id: '5',
        text: 'Светлой Пасхи! Пусть этот день принесет в ваш дом мир, благодать и много-много тепла, озаряя сердца верой и надеждой.',
        category: 'Пасха',
        tags: ['пасха', 'христос воскресе', 'мир', 'благодать', 'тепло', 'праздник', 'церковный', 'вера', 'надежда'],
        image: '/pascha_card.png'
    },
    {
        id: '5a',
        text: 'Христос Воскресе! Желаю вам и вашей семье радости, надежды и обновления души в этот светлый праздник. Пусть добро всегда побеждает!',
        category: 'Пасха',
        tags: ['пасха', 'христос воскресе', 'радость', 'надежда', 'обновление', 'праздник', 'церковный', 'добро'],
        image: '/general_celebration_card_2.png'
    },
    {
        id: '6',
        text: 'С Днем Победы! Низкий поклон и безграничная благодарность за мирное небо над головой. Вечная память героям, чьи сердца хранили Отчизну!',
        category: '9 Мая',
        tags: ['9 мая', 'день победы', 'война', 'мир', 'благодарность', 'герои', 'поздравление', 'праздник', 'память', 'Отчизна'],
        image: '/patriotic_card.png'
    },
    {
        id: '6a',
        text: 'С великим Днем Победы! Пусть подвиг героев всегда живет в наших сердцах, а мир будет вечным, как этот майский день!',
        category: '9 Мая',
        tags: ['9 мая', 'день победы', 'подвиг', 'герои', 'мир', 'память', 'поздравление', 'май'],
        image: '/patriotic_card_2.png'
    },
    {
        id: '7',
        text: 'Поздравляю с днем свадьбы! Желаю бесконечной любви, взаимопонимания и счастливой семейной жизни, полной чудесных моментов.',
        category: 'Свадьба',
        tags: ['свадьба', 'брак', 'любовь', 'семья', 'понимание', 'счастье', 'поздравление', 'молодожены', 'чудеса'],
        image: '/wedding_card.png'
    },
    {
        id: '7a',
        text: 'С днем свадьбы, дорогие! Пусть ваш союз будет крепким, а каждый день совместной жизни — сказкой, написанной любовью и согласием.',
        category: 'Свадьба',
        tags: ['свадьба', 'брак', 'союз', 'крепкий', 'сказка', 'любовь', 'поздравление', 'согласие'],
        image: '/wedding_card_2.png'
    },
    {
        id: '7b',
        text: 'Поздравляю молодоженов! Желаю гармонии, страсти и долгих лет, проведенных в радости и согласии, создавая счастливое будущее вместе.',
        category: 'Свадьба',
        tags: ['свадьба', 'молодожены', 'гармония', 'страсть', 'радость', 'согласие', 'любовь', 'поздравление', 'будущее'],
        image: '/wedding_card_3.png'
    },
    {
        id: '8',
        text: 'С Рождеством Христовым! Пусть в вашей жизни царят гармония, добро и светлые надежды, согревая душу в зимнюю стужу.',
        category: 'Рождество',
        tags: ['рождество', 'христос', 'гармония', 'добро', 'надежды', 'праздник', 'церковный', 'зима', 'свет'],
        image: '/new_year_card.png'
    },
    {
        id: '8a',
        text: 'Поздравляю с Рождеством! Желаю волшебства, уюта в доме и счастья в каждом мгновении, пусть звезда Рождества освещает ваш путь.',
        category: 'Рождество',
        tags: ['рождество', 'волшебство', 'уют', 'счастье', 'праздник', 'поздравление', 'зима', 'звезда'],
        image: '/new_year_card_2.png'
    },
    {
        id: '9',
        text: 'С Крещением Господним! Желаю очищения души, крепкого здоровья и Божьей благодати, чтобы сердце наполнилось миром и светом.',
        category: 'Крещение',
        tags: ['крещение', 'господне', 'очищение', 'здоровье', 'благодать', 'праздник', 'церковный', 'вода', 'мир', 'свет'],
        image: '/new_year_card_3.png'
    },
    {
        id: '9a',
        text: 'В Крещенский сочельник желаю мира в сердце, света в мыслях и тепла в душе. Пусть благодать сойдет на вас и ваш дом!',
        category: 'Крещение',
        tags: ['крещение', 'сочельник', 'мир', 'свет', 'тепло', 'поздравление', 'праздник', 'благодать'],
        image: '/general_celebration_card_3.png'
    },
    {
        id: '10',
        text: 'С Днем знаний! Пусть новый учебный год будет полон открытий, успехов и интересных моментов, вдохновляя на новые свершения.',
        category: '1 Сентября',
        tags: ['1 сентября', 'день знаний', 'учебный год', 'школа', 'студенты', 'открытия', 'успехи', 'поздравление', 'вдохновение'],
        image: '/graduation_card.png'
    },
    {
        id: '10a',
        text: 'Поздравляю с 1 сентября! Желаю легкой учебы, высоких оценок и много новых друзей, пусть каждый урок приносит радость.',
        category: '1 Сентября',
        tags: ['1 сентября', 'день знаний', 'учеба', 'оценки', 'друзья', 'школа', 'студенты', 'поздравление', 'радость'],
        image: '/graduation_card_2.png'
    },
    {
        id: '11',
        text: 'С юбилеем! Желаем долгих лет жизни, наполненных радостью, удачей и прекрасными моментами, пусть каждый день будет ярким праздником!',
        category: 'Юбилей',
        tags: ['юбилей', 'праздник', 'возраст', 'долгих лет', 'радость', 'удача', 'поздравление', 'моменты', 'яркость'],
        image: '/general_celebration_card.png'
    },
    {
        id: '11a',
        text: 'Поздравляю с прекрасным юбилеем! Пусть каждый год приносит новые свершения и яркие впечатления, а энергия бьет ключом!',
        category: 'Юбилей',
        tags: ['юбилей', 'свершения', 'впечатления', 'поздравление', 'праздник', 'энергия'],
        image: '/general_celebration_card_2.png'
    },
    {
        id: '11b',
        text: 'С юбилеем! Желаю крепкого здоровья, неиссякаемой энергии и бесконечного оптимизма, чтобы жить на полную катушку!',
        category: 'Юбилей',
        tags: ['юбилей', 'здоровье', 'энергия', 'оптимизм', 'поздравление', 'праздник', 'жизнь'],
        image: '/general_celebration_card_3.png'
    },
    {
        id: '12',
        text: 'С Днем учителя! Благодарим за ваш труд, терпение и мудрость, которые вы дарите своим ученикам, освещая их путь к знаниям.',
        category: 'День учителя',
        tags: ['день учителя', 'учитель', 'школа', 'благодарность', 'труд', 'мудрость', 'поздравление', 'праздник', 'знания'],
        image: '/graduation_card_3.png'
    },
    {
        id: '12a',
        text: 'С Днем учителя! Желаем вам талантливых учеников, вдохновения и профессиональных успехов, пусть работа приносит истинное удовольствие!',
        category: 'День учителя',
        tags: ['день учителя', 'учитель', 'ученики', 'вдохновение', 'успехи', 'поздравление', 'удовольствие'],
        image: '/general_celebration_card.png'
    },
    {
        id: '13',
        text: 'С Днем всех влюбленных! Пусть любовь окрыляет, вдохновляет и делает каждый день особенным, наполненным нежностью и романтикой.',
        category: 'День всех влюбленных',
        tags: ['день влюбленных', '14 февраля', 'любовь', 'валентин', 'вдохновение', 'праздник', 'поздравление', 'нежность', 'романтика'],
        image: '/wedding_card_2.png'
    },
    {
        id: '13a',
        text: 'С Днем святого Валентина! Желаю искренних чувств, романтики и счастья в отношениях, чтобы ваше сердце пело от любви!',
        category: 'День всех влюбленных',
        tags: ['день влюбленных', 'валентин', 'чувства', 'романтика', 'счастье', 'любовь', 'поздравление', 'сердце'],
        image: '/wedding_card_3.png'
    },
    {
        id: '14',
        text: 'С профессиональным праздником! Желаем успехов в работе, карьерного роста и удовлетворения от своего дела, пусть труд будет в радость.',
        category: 'Профессиональный праздник',
        tags: ['профессиональный праздник', 'работа', 'успех', 'карьера', 'труд', 'поздравление', 'удовлетворение', 'радость'],
        image: '/company_anniversary_card.png'
    },
    {
        id: '14a',
        text: 'Поздравляю с профессиональным праздником! Пусть ваш труд всегда ценится, а работа приносит радость и новые свершения каждый день!',
        category: 'Профессиональный праздник',
        tags: ['профессиональный праздник', 'труд', 'работа', 'радость', 'успех', 'поздравление', 'свершения'],
        image: '/general_celebration_card_2.png'
    },
    {
        id: '15',
        text: 'С новосельем! Пусть ваш новый дом будет полон тепла, уюта и счастливых моментов, став настоящим гнездышком любви и покоя.',
        category: 'Новоселье',
        tags: ['новоселье', 'дом', 'переезд', 'уют', 'тепло', 'счастье', 'поздравление', 'покой', 'любовь'],
        image: '/new_home_card.png'
    },
    {
        id: '15a',
        text: 'Поздравляю с новосельем! Желаю, чтобы в вашем новом доме всегда царили мир, любовь и благополучие, а двери были открыты для друзей.',
        category: 'Новоселье',
        tags: ['новоселье', 'дом', 'мир', 'любовь', 'благополучие', 'поздравление', 'друзья'],
        image: '/general_celebration_card_3.png'
    },
    {
        id: '16',
        text: 'С выпускным! Пусть впереди ждет светлое будущее, полное новых свершений и побед, и все мечты станут реальностью!',
        category: 'Выпускной',
        tags: ['выпускной', 'окончание', 'школа', 'университет', 'будущее', 'свершения', 'победы', 'поздравление', 'мечты'],
        image: '/graduation_card.png'
    },
    {
        id: '16a',
        text: 'С выпускным! Желаю успешно пройти все жизненные экзамены и найти свой путь к счастью, пусть каждый шаг ведет к успеху!',
        category: 'Выпускной',
        tags: ['выпускной', 'экзамены', 'счастье', 'путь', 'школа', 'университет', 'поздравление', 'успех'],
        image: '/graduation_card_2.png'
    },
    {
        id: '17',
        text: 'С Днем матери! Благодарим за нежность, заботу и безграничную любовь, которую вы нам дарите, вы — наш ангел-хранитель.',
        category: 'День матери',
        tags: ['день матери', 'мама', 'любовь', 'забота', 'нежность', 'поздравление', 'праздник', 'ангел'],
        image: '/womens_day_card.png'
    },
    {
        id: '17a',
        text: 'С Днем матери! Пусть каждое мгновение вашей жизни будет наполнено теплом, радостью и гордостью за детей, а глаза сияют счастьем.',
        category: 'День матери',
        tags: ['день матери', 'мама', 'тепло', 'радость', 'гордость', 'дети', 'поздравление', 'счастье'],
        image: '/womens_day_card_2.png'
    },
    {
        id: '18',
        text: 'С Днем отца! Желаем крепкого здоровья, мудрости и чтобы дети всегда радовали своими успехами, гордились вами и брали пример.',
        category: 'День отца',
        tags: ['день отца', 'папа', 'здоровье', 'мудрость', 'дети', 'успехи', 'поздравление', 'праздник', 'гордость'],
        image: '/mens_day_card.png'
    },
    {
        id: '18a',
        text: 'Поздравляю с Днем отца! Спасибо за силу, опору и пример, который вы подаете своим детям, будьте всегда рядом!',
        category: 'День отца',
        tags: ['день отца', 'папа', 'сила', 'опора', 'пример', 'дети', 'поздравление'],
        image: '/mens_day_card_2.png'
    },
    {
        id: '19',
        text: 'С Днем России! Желаю процветания нашей великой стране и благополучия каждому ее жителю, пусть единство будет крепким!',
        category: 'День России',
        tags: ['день россии', 'родина', 'страна', 'патриотизм', 'праздник', 'поздравление', 'единство', 'благополучие'],
        image: '/patriotic_card_2.png'
    },
    {
        id: '19a',
        text: 'Поздравляю с Днем России! Пусть мир и согласие царят на нашей земле, а каждый день приносит новые достижения и гордость за Отчизну.',
        category: 'День России',
        tags: ['день россии', 'мир', 'согласие', 'достижения', 'праздник', 'поздравление', 'гордость', 'Отчизна'],
        image: '/patriotic_card_3.png'
    },
    {
        id: '20',
        text: 'С Днем народного единства! Пусть согласие и взаимопонимание будут основой нашего общества, ведущей к процветанию и миру.',
        category: 'День народного единства',
        tags: ['день народного единства', 'единство', 'народ', 'согласие', 'взаимопонимание', 'праздник', 'поздравление', 'мир', 'процветание'],
        image: '/patriotic_card.png'
    },
    {
        id: '20a',
        text: 'Поздравляю с Днем народного единства! Вместе мы сила, вместе мы можем многое! Пусть этот день вдохновит на великие дела.',
        category: 'День народного единства',
        tags: ['день народного единства', 'сила', 'единство', 'народ', 'праздник', 'поздравление', 'вдохновение'],
        image: '/patriotic_card_3.png'
    },
    {
        id: '21',
        text: 'С получением диплома! Это важный шаг к новым вершинам. Удачи в карьере и жизни, пусть знания ведут к успеху!',
        category: 'Получение диплома',
        tags: ['диплом', 'окончание учебы', 'карьера', 'успех', 'образование', 'поздравление', 'знания'],
        image: '/graduation_card_2.png'
    },
    {
        id: '21a',
        text: 'Поздравляю с дипломом! Пусть знания, полученные в учебе, станут крепкой основой для будущих побед и счастливой жизни.',
        category: 'Получение диплома',
        tags: ['диплом', 'знания', 'победы', 'успех', 'учеба', 'поздравление', 'жизнь'],
        image: '/graduation_card_3.png'
    },
    {
        id: '22',
        text: 'С выходом на пенсию! Пусть новый этап жизни будет полон ярких впечатлений, отдыха и реализации давних планов, наслаждайтесь каждым днем!',
        category: 'Выход на пенсию',
        tags: ['выход на пенсию', 'пенсия', 'отдых', 'планы', 'свобода', 'новый этап', 'поздравление', 'наслаждение'],
        image: '/pension_card.png'
    },
    {
        id: '22a',
        text: 'Поздравляю с пенсией! Желаю наслаждаться каждым днем, заниматься любимыми делами и радоваться жизни, полной свободы и новых открытий.',
        category: 'Выход на пенсию',
        tags: ['пенсия', 'наслаждение', 'любимые дела', 'радость', 'жизнь', 'поздравление', 'свобода', 'открытия'],
        image: '/general_celebration_card_2.png'
    },
    {
        id: '23',
        text: 'С рождением малыша! Пусть ваш дом наполнится смехом, радостью и бесконечной любовью, а каждый день будет маленьким чудом.',
        category: 'Рождение ребенка',
        tags: ['рождение ребенка', 'малыш', 'новорожденный', 'смех', 'радость', 'любовь', 'семья', 'поздравление', 'чудо'],
        image: '/new_baby_card.png'
    },
    {
        id: '23a',
        text: 'Поздравляю с пополнением! Желаю здоровья маме и малышу, спокойных ночей и счастливых дней, полных нежности и уюта.',
        category: 'Рождение ребенка',
        tags: ['рождение ребенка', 'мама', 'малыш', 'здоровье', 'семья', 'пополнение', 'поздравление', 'нежность', 'уют'],
        image: '/general_celebration_card_3.png'
    }
];

// List of available image assets for admin panel selection - kept here for main site's categoryImageMap fallback
const availableImageAssets = [
    '/birthday_card.png',
    '/birthday_card_2.png',
    '/birthday_card_3.png',
    '/birthday_card_4.png',
    '/child_day_card.png',
    '/company_anniversary_card.png',
    '/general_celebration_card.png',
    '/general_celebration_card_2.png',
    '/general_celebration_card_3.png',
    '/graduation_card.png',
    '/graduation_card_2.png',
    '/graduation_card_3.png',
    '/may_day_card.png',
    '/mens_day_card.png',
    '/mens_day_card_2.png',
    '/mens_day_card_3.png',
    '/new_baby_card.png',
    '/new_home_card.png',
    '/new_year_card.png',
    '/new_year_card_2.png',
    '/new_year_card_3.png',
    '/pascha_card.png',
    '/patriotic_card.png',
    '/patriotic_card_2.png',
    '/patriotic_card_3.png',
    '/pension_card.png',
    '/wedding_card.png',
    '/wedding_card_2.png',
    '/wedding_card_3.png',
    '/womens_day_card.png',
    '/womens_day_card_2.png',
    '/womens_day_card_3.png'
];

// Map for category images (fallback if a specific card image is missing)
const categoryImageMap = {
    'День рождения': '/birthday_card.png',
    'Новый год': '/new_year_card.png',
    'Рождество': '/new_year_card.png',
    'Крещение': '/new_year_card.png',
    '8 Марта': '/womens_day_card.png',
    'День матери': '/womens_day_card.png',
    '23 Февраля': '/mens_day_card.png',
    'День отца': '/mens_day_card.png',
    'Свадьба': '/wedding_card.png',
    'Годовщина свадьбы': '/wedding_card.png',
    'День всех влюбленных': '/wedding_card.png',
    '9 Мая': '/patriotic_card.png',
    'День России': '/patriotic_card.png',
    'День народного единства': '/patriotic_card.png',
    'Выпускной': '/graduation_card.png',
    '1 Сентября': '/graduation_card.png',
    'Получение диплома': '/graduation_card.png',
    'Повышение': '/graduation_card.png',
    'День учителя': '/graduation_card.png',
    'Юбилей': '/general_celebration_card.png',
    'Профессиональный праздник': '/company_anniversary_card.png',
    'Новоселье': '/new_home_card.png',
    'Выход на пенсию': '/pension_card.png',
    'Рождение ребенка': '/new_baby_card.png',
    'Годовщина компании': '/company_anniversary_card.png',
    'Пасха': '/pascha_card.png',
    'День защиты детей': '/child_day_card.png',
    '1 Мая': '/may_day_card.png'
};

const greetingsListElement = document.getElementById('greetings-list');
const categoriesContainer = document.getElementById('categories-container');
const noResultsMessage = document.getElementById('no-results');
const loadMoreButton = document.getElementById('load-more-button'); // Get the load more button

let currentCategory = 'Все'; // Tracks the currently active category filter
/* @tweakable The number of greetings to display per page initially and when loading more */
const greetingsPerPage = 12; // Number of greetings to load per page
let currentPage = 1;
let currentFilteredGreetings = []; // Holds the list of greetings after filtering by category
let mainSiteGreetingsData = []; // The actual data set used by the main site, loaded from localStorage or default

// Web Audio API for sound effects - `copy_sound.mp3` is no longer used, removed sound functions.
// If new sound effects are needed, they should be implemented here.

// --- Helper Functions for Main Site ---

// Function to load greetings data for the main site, prioritizing localStorage
function initializeMainSiteGreetings() {
    const savedData = localStorage.getItem('adminGreetingsData');
    if (savedData) {
        try {
            // Ensure any blob URLs are reverted if coming from a stale session
            const loadedData = JSON.parse(savedData).map(g => {
                if (g.image && g.image.startsWith('blob:')) {
                    // Fallback to a default asset if blob URL is invalid for display on main site
                    return { ...g, image: categoryImageMap[g.category] || '/general_celebration_card.png' };
                }
                return g;
            });
            mainSiteGreetingsData = loadedData;
            console.log("Main site: Loaded greetings from local storage.");
        } catch (e) {
            console.error("Main site: Error parsing adminGreetingsData from localStorage, using default.", e);
            mainSiteGreetingsData = JSON.parse(JSON.stringify(greetingsData)); // Deep copy original default
        }
    } else {
        mainSiteGreetingsData = JSON.parse(JSON.stringify(greetingsData)); // Deep copy original default
        console.log("Main site: No admin data found, using default greetings.");
    }
}

function renderGreetingsBatch(greetingsToDisplay, startIndex, append) {
    if (!append) {
        greetingsListElement.innerHTML = ''; // Clear for new filter/category
    }

    const endIndex = Math.min(startIndex + greetingsPerPage, greetingsToDisplay.length);
    const batch = greetingsToDisplay.slice(startIndex, endIndex);

    if (batch.length === 0 && !append) { // No greetings found for the filter
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }

    batch.forEach(greeting => {
        const greetingCard = document.createElement('div');
        greetingCard.classList.add('greeting-card');

        // Get the image URL for the greeting
        const imageUrl = greeting.image || categoryImageMap[greeting.category] || '/general_celebration_card.png';

        greetingCard.innerHTML = `
            <img src="${imageUrl}" alt="Открытка для категории ${greeting.category}" class="greeting-image" loading="lazy">
            <p class="greeting-text">${greeting.text}</p>
            <div class="greeting-actions">
                <img src="/icon_sound_wave.png" alt="Голосовое" class="voice-indicator">
                <button class="share-vk-button" data-text="${greeting.text}">
                    <img src="/vk_icon.png" alt="ВКонтакте" class="vk-share-icon">
                    <span>Поделиться</span>
                </button>
            </div>
        `;
        greetingsListElement.appendChild(greetingCard);
    });

    // Update Load More button visibility
    if (loadMoreButton) {
        if (endIndex < greetingsToDisplay.length) {
            loadMoreButton.classList.remove('hidden');
        } else {
            loadMoreButton.classList.add('hidden');
        }
    }
}

function generateCategoryButtons() {
    const uniqueCategories = [...new Set(mainSiteGreetingsData.map(g => g.category))].sort((a, b) => {
        if (a === 'Все') return -1;
        if (b === 'Все') return 1;
        return a.localeCompare(b, 'ru');
    });

    const categories = ['Все', ...uniqueCategories.filter(cat => cat && cat !== 'Все')]; // Filter out empty or null categories
    
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('category-button');
        if (category === currentCategory) {
            button.classList.add('active');
        }
        button.dataset.category = category;
        button.textContent = category;
        categoriesContainer.appendChild(button);
    });
}

function filterAndSearchGreetings() {
    let filteredGreetings = mainSiteGreetingsData;

    // Filter by category
    if (currentCategory !== 'Все') {
        filteredGreetings = filteredGreetings.filter(greeting => greeting.category === currentCategory);
    }

    currentFilteredGreetings = filteredGreetings; // Store for pagination
    currentPage = 1; // Reset pagination for new filter

    renderGreetingsBatch(currentFilteredGreetings, 0, false); // Render first batch, not appending
}

function loadMoreGreetings() {
    currentPage++;
    const startIndex = (currentPage - 1) * greetingsPerPage;
    renderGreetingsBatch(currentFilteredGreetings, startIndex, true); // Append next batch
}

// --- Event Listeners for Main Site ---

categoriesContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('category-button')) {
        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        currentCategory = target.dataset.category;
        filterAndSearchGreetings(); // Re-filter and re-render from start
    }
});

loadMoreButton.addEventListener('click', loadMoreGreetings);

greetingsListElement.addEventListener('click', async (event) => {
    const target = event.target;
    const shareVkButton = target.closest('.share-vk-button'); // Only check for VK share button

    if (shareVkButton) {
        let textToShare = shareVkButton.dataset.text;
        
        // Append the portal link to the text to be shared
        const portalLink = "https://поздравления.fun/";
        textToShare = `${textToShare}\n\n${portalLink}`; // Add a couple of newlines for better formatting

        const pageUrl = encodeURIComponent(window.location.href);
        const title = encodeURIComponent("Голосовые Поздравления – Отправьте Звонок на Телефон!");
        // The image for VK share should ideally be an absolute URL for persistence.
        // For a client-side app, we use a fixed project asset.
        const imageUrl = encodeURIComponent(window.location.origin + '/logo.png');

        const vkShareUrl = `https://vk.com/share.php?act=share&url=${pageUrl}&title=${title}&description=${encodeURIComponent(textToShare)}&image=${imageUrl}`;
        
        window.open(vkShareUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeMainSiteGreetings(); // Set up the data source
        generateCategoryButtons();
        filterAndSearchGreetings(); // Display greetings from the active data
    } catch (e) {
        console.error("Error during script initialization:", e);
    }
});