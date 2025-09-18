// Original default greetings data, used as a fallback or for initializing a new admin session.
// This data is intentionally duplicated here to make admin.js self-contained.
const defaultGreetingsData = [
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

// List of available image assets for admin panel selection.
// This is duplicated here to ensure admin.js is self-contained.
const availableImageAssets = [
    '/birthday_card.png',
    '/birthday_card_2.png',
    '/birthday_card_3.png',
    '/birthday_card_4.png',
    '/child_day_card.png',
    '/' + 'company_anniversary_card.png', // Concat to avoid asset detection during generation
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

// Map for category images (fallback if a specific card image is missing).
// This is duplicated here to ensure admin.js is self-contained.
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
    'Профессиональный праздник': '/general_celebration_card.png',
    'Новоселье': '/new_home_card.png',
    'Выход на пенсию': '/pension_card.png',
    'Рождение ребенка': '/new_baby_card.png',
    'Годовщина компании': '/company_anniversary_card.png',
    'Пасха': '/pascha_card.png',
    'День защиты детей': '/child_day_card.png',
    '1 Мая': '/may_day_card.png'
};

// Admin Panel Elements
const adminLoginOverlay = document.getElementById('admin-login-overlay');
const adminPanelMain = document.getElementById('admin-panel-main');
const adminUsernameInput = document.getElementById('admin-username');
const adminPinInput = document.getElementById('admin-pin');
const adminLoginButton = document.getElementById('admin-login-button');
const loginErrorMessage = document.getElementById('login-error-message');
const adminLoginBackButton = document.getElementById('admin-login-back-button');
const adminLogoutButton = document.getElementById('admin-logout-button');

const addNewGreetingButton = document.getElementById('add-new-greeting-button');
const deleteGreetingButton = document.getElementById('delete-greeting-button');
const greetingSelector = document.getElementById('greeting-selector');
const greetingEditor = document.getElementById('greeting-editor');
const editCategoryInput = document.getElementById('edit-category');
const editTextarea = document.getElementById('edit-text');
const editTagsTextarea = document.getElementById('edit-tags');
const currentGreetingImage = document.getElementById('current-greeting-image');
const imageAssetSelector = document.getElementById('image-asset-selector');
const imageUploadInput = document.getElementById('image-upload');
const newGreetingImagePreview = document.getElementById('new-greeting-image-preview');
const saveGreetingChangesButton = document.getElementById('save-greeting-changes');
const saveMessage = document.getElementById('save-message');

/* @tweakable The username for accessing the admin panel */
const ADMIN_USERNAME = 'OLEGATORMG';
/* @tweakable The PIN code for accessing the admin panel */
const ADMIN_PIN = '2089';

let editableGreetingsData = []; // This will hold the greetings data, potentially modified
let currentEditingGreetingId = null; // Stores the ID of the greeting currently being edited
let isAddingNewGreeting = false; // Flag to determine if we're adding a new greeting
let newImageObjectURL = null; // Stores the object URL for the currently uploaded image in admin panel

// --- Helper Functions ---
function showOverlay(overlayElement) {
    overlayElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling main content
}

function hideOverlay(overlayElement) {
    overlayElement.classList.add('hidden');
    document.body.style.overflow = ''; // Restore body scroll
}

function saveAdminGreetingsToLocalStorage() {
    const dataToStore = editableGreetingsData.map(g => {
        const copy = { ...g };
        // If the image is an object URL, it means it's a session-only upload.
        // We should not save it to local storage as it will be invalid on refresh.
        // Revert it to its original asset path or category fallback for persistent storage.
        if (copy.image && copy.image.startsWith('blob:')) {
            const originalGreeting = defaultGreetingsData.find(og => og.id === copy.id);
            copy.image = originalGreeting ? originalGreeting.image : (categoryImageMap[copy.category] || '/general_celebration_card.png');
        }
        return copy;
    });
    localStorage.setItem('adminGreetingsData', JSON.stringify(dataToStore));
}

function loadAdminGreetingsFromLocalStorage() {
    const savedData = localStorage.getItem('adminGreetingsData');
    if (savedData) {
        try {
            // Filter out potentially invalid blob URLs from a previous session load if they somehow made it to storage
            const loadedData = JSON.parse(savedData).map(g => {
                if (g.image && g.image.startsWith('blob:')) {
                    const originalGreeting = defaultGreetingsData.find(og => og.id === g.id);
                    g.image = originalGreeting ? originalGreeting.image : (categoryImageMap[g.category] || '/general_celebration_card.png');
                }
                return g;
            });
            editableGreetingsData = loadedData;
            console.log("Admin: Loaded greetings from local storage. Text/category/tag and asset image changes are persistent. Uploaded images are session-only.");
        } catch (e) {
            console.error("Admin: Error parsing adminGreetingsData from localStorage, using default data.", e);
            editableGreetingsData = JSON.parse(JSON.stringify(defaultGreetingsData)); // Deep copy original data
        }
    } else {
        editableGreetingsData = JSON.parse(JSON.stringify(defaultGreetingsData)); // Deep copy original data
        console.log("Admin: No existing admin data found, initialized from defaultGreetingsData.");
    }
}

function populateGreetingSelector() {
    greetingSelector.innerHTML = '<option value="">Выберите поздравление для редактирования</option>';
    editableGreetingsData.forEach(greeting => {
        const option = document.createElement('option');
        option.value = greeting.id;
        option.textContent = `${greeting.category}: ${greeting.text.substring(0, 50)}${greeting.text.length > 50 ? '...' : ''}`;
        greetingSelector.appendChild(option);
    });
}

function populateImageAssetSelector() {
    imageAssetSelector.innerHTML = '<option value="">Не выбрано (оставить текущее или загрузить новое)</option>';
    availableImageAssets.forEach(assetPath => {
        const option = document.createElement('option');
        option.value = assetPath;
        // Display a more readable name, e.g., "birthday_card.png"
        option.textContent = assetPath.split('/').pop();
        imageAssetSelector.appendChild(option);
    });
}

function selectGreetingForEdit(greetingId) {
    currentEditingGreetingId = greetingId;
    isAddingNewGreeting = false;
    const greeting = editableGreetingsData.find(g => g.id === greetingId);

    if (greeting) {
        editCategoryInput.value = greeting.category || '';
        editTextarea.value = greeting.text;
        editTagsTextarea.value = (greeting.tags || []).join(', ');
        
        // Use the greeting's current image (which might be an object URL from current session)
        // or its asset path/fallback
        const imageUrl = greeting.image || categoryImageMap[greeting.category] || '/general_celebration_card.png';
        currentGreetingImage.src = imageUrl;
        currentGreetingImage.classList.remove('hidden'); 

        // Set the asset selector if the current image is an asset
        const isAssetSelected = availableImageAssets.includes(greeting.image);
        imageAssetSelector.value = isAssetSelected ? greeting.image : '';

        // Clear previous new image preview and input
        if (newImageObjectURL) {
            URL.revokeObjectURL(newImageObjectURL);
            newImageObjectURL = null;
        }
        imageUploadInput.value = ''; // Clear file input
        newGreetingImagePreview.classList.add('hidden');
        newGreetingImagePreview.src = '';
        saveMessage.textContent = ''; // Clear save message
        greetingEditor.classList.remove('hidden');
    } else {
        // If no greeting is selected (e.g., after deletion or initial state)
        greetingEditor.classList.add('hidden');
        clearEditorFields();
    }
    toggleDeleteButton();
}

function clearEditorFields() {
    editCategoryInput.value = '';
    editTextarea.value = '';
    editTagsTextarea.value = '';
    currentGreetingImage.src = '';
    currentGreetingImage.classList.add('hidden');
    imageAssetSelector.value = '';
    if (newImageObjectURL) {
        URL.revokeObjectURL(newImageObjectURL);
        newImageObjectURL = null;
    }
    imageUploadInput.value = '';
    newGreetingImagePreview.classList.add('hidden');
    newGreetingImagePreview.src = '';
    saveMessage.textContent = '';
}

function toggleDeleteButton() {
    deleteGreetingButton.disabled = !currentEditingGreetingId;
    if (currentEditingGreetingId) {
        deleteGreetingButton.classList.remove('disabled');
    } else {
        deleteGreetingButton.classList.add('disabled');
    }
}

// --- Event Listeners ---

adminLoginButton.addEventListener('click', () => {
    const username = adminUsernameInput.value;
    const pin = adminPinInput.value;

    if (username === ADMIN_USERNAME && pin === ADMIN_PIN) {
        hideOverlay(adminLoginOverlay);
        showOverlay(adminPanelMain);
        populateGreetingSelector();
        populateImageAssetSelector();
        greetingSelector.value = '';
        currentEditingGreetingId = null;
        isAddingNewGreeting = false;
        greetingEditor.classList.add('hidden');
        clearEditorFields();
        toggleDeleteButton();
    } else {
        loginErrorMessage.textContent = 'Неверный логин или пин-код.';
    }
});

adminLoginBackButton.addEventListener('click', () => {
    // Redirect to main page
    window.location.href = '/'; 
});

adminLogoutButton.addEventListener('click', () => {
    hideOverlay(adminPanelMain);
    showOverlay(adminLoginOverlay); // Show login overlay again
    clearEditorFields(); // Clear any editor data
    populateGreetingSelector(); // Re-populate selector (in case data changed)
    greetingSelector.value = ''; // Reset selector
    currentEditingGreetingId = null;
    isAddingNewGreeting = false;
    toggleDeleteButton();
    saveMessage.textContent = ''; // Clear save message
});

addNewGreetingButton.addEventListener('click', () => {
    clearEditorFields();
    greetingSelector.value = ''; // Deselect any existing greeting
    currentEditingGreetingId = null;
    isAddingNewGreeting = true;
    greetingEditor.classList.remove('hidden');
    saveMessage.textContent = 'Добавьте текст, категорию, теги и выберите изображение.';
    saveMessage.style.color = '#333';
    toggleDeleteButton(); // Disable delete for new greeting
});

deleteGreetingButton.addEventListener('click', () => {
    if (currentEditingGreetingId && confirm('Вы уверены, что хотите удалить это поздравление?')) {
        editableGreetingsData = editableGreetingsData.filter(g => g.id !== currentEditingGreetingId);
        saveAdminGreetingsToLocalStorage();
        populateGreetingSelector();
        greetingSelector.value = '';
        currentEditingGreetingId = null;
        isAddingNewGreeting = false;
        greetingEditor.classList.add('hidden');
        clearEditorFields();
        toggleDeleteButton();
        saveMessage.textContent = 'Поздравление удалено.';
        saveMessage.style.color = '#28a745';
        // Note: The main site data will only refresh on its next page load or specific refresh action.
    }
});

greetingSelector.addEventListener('change', (e) => {
    selectGreetingForEdit(e.target.value);
});

imageUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (newImageObjectURL) { // Revoke previous object URL if exists
            URL.revokeObjectURL(newImageObjectURL);
        }
        newImageObjectURL = URL.createObjectURL(file);
        newGreetingImagePreview.src = newImageObjectURL;
        newGreetingImagePreview.classList.remove('hidden');
        currentGreetingImage.classList.add('hidden'); // Hide current image when new is uploaded
        imageAssetSelector.value = ''; // Clear asset selection when uploading a new file
        saveMessage.textContent = 'Внимание: Загруженные изображения сохраняются только на текущую сессию браузера. Для постоянного изображения используйте выбор из списка.';
        saveMessage.style.color = '#f7b731'; // Warning color
    } else {
        if (newImageObjectURL) {
            URL.revokeObjectURL(newImageObjectURL);
            newImageObjectURL = null;
        }
        newGreetingImagePreview.classList.add('hidden');
        newGreetingImagePreview.src = '';
        // If no file, show current asset image again if one exists for the selected greeting
        if (currentEditingGreetingId) {
            const greeting = editableGreetingsData.find(g => g.id === currentEditingGreetingId);
            if (greeting && greeting.image && !greeting.image.startsWith('blob:')) {
                currentGreetingImage.src = greeting.image;
                currentGreetingImage.classList.remove('hidden');
            }
        }
    }
});

imageAssetSelector.addEventListener('change', (e) => {
    const selectedAsset = e.target.value;
    if (selectedAsset) {
        currentGreetingImage.src = selectedAsset;
        currentGreetingImage.classList.remove('hidden');
        // Clear any temporary uploaded image
        if (newImageObjectURL) {
            URL.revokeObjectURL(newImageObjectURL);
            newImageObjectURL = null;
        }
        imageUploadInput.value = '';
        newGreetingImagePreview.classList.add('hidden');
        newGreetingImagePreview.src = '';
        saveMessage.textContent = ''; // Clear warning about temporary image
    } else if (currentEditingGreetingId) { // If "Не выбрано" is selected for an existing greeting
        const greeting = editableGreetingsData.find(g => g.id === currentEditingGreetingId);
        if (greeting) {
            // Revert to original asset or category default
            const defaultImage = categoryImageMap[greeting.category] || '/general_celebration_card.png';
            currentGreetingImage.src = greeting.image && !greeting.image.startsWith('blob:') ? greeting.image : defaultImage;
            currentGreetingImage.classList.remove('hidden');
        }
    } else { // For new greeting, if nothing is selected
        currentGreetingImage.src = '';
        currentGreetingImage.classList.add('hidden');
    }
});

saveGreetingChangesButton.addEventListener('click', () => {
    const category = editCategoryInput.value.trim();
    const text = editTextarea.value.trim();
    const tags = editTagsTextarea.value.split(',').map(tag => tag.trim()).filter(tag);

    if (!category || !text) {
        saveMessage.textContent = 'Пожалуйста, заполните Категорию и Текст поздравления.';
        saveMessage.style.color = '#dc3545';
        return;
    }

    let imageUrlToSave;
    if (newImageObjectURL) {
        imageUrlToSave = newImageObjectURL; // Temporary blob URL for current session
    } else if (imageAssetSelector.value) {
        imageUrlToSave = imageAssetSelector.value; // Persistent asset path
    } else if (currentEditingGreetingId) {
        const existingGreeting = editableGreetingsData.find(g => g.id === currentEditingGreetingId);
        imageUrlToSave = existingGreeting ? existingGreeting.image : (categoryImageMap[category] || '/general_celebration_card.png');
    } else {
        imageUrlToSave = categoryImageMap[category] || '/general_celebration_card.png'; // Default for new greeting
    }

    if (isAddingNewGreeting) {
        const newGreeting = {
            id: Date.now().toString(), // Simple unique ID
            category,
            text,
            tags,
            image: imageUrlToSave
        };
        editableGreetingsData.push(newGreeting);
        currentEditingGreetingId = newGreeting.id; // Select the new greeting for further editing
        isAddingNewGreeting = false;
        saveMessage.textContent = 'Новое поздравление добавлено! (Изображения, загруженные с устройства, видны только в текущей сессии)';
    } else if (currentEditingGreetingId) {
        const greetingIndex = editableGreetingsData.findIndex(g => g.id === currentEditingGreetingId);
        if (greetingIndex !== -1) {
            editableGreetingsData[greetingIndex].category = category;
            editableGreetingsData[greetingIndex].text = text;
            editableGreetingsData[greetingIndex].tags = tags;
            editableGreetingsData[greetingIndex].image = imageUrlToSave; // Update image path
            saveMessage.textContent = 'Изменения сохранены! (Изображения, загруженные с устройства, видны только в текущей сессии)';
        } else {
            saveMessage.textContent = 'Ошибка: поздравление не найдено.';
            saveMessage.style.color = '#dc3545';
            return;
        }
    } else {
        saveMessage.textContent = 'Пожалуйста, выберите поздравление для редактирования или создайте новое.';
        saveMessage.style.color = '#dc3545';
        return;
    }
    
    saveMessage.style.color = '#28a745';
    saveAdminGreetingsToLocalStorage(); // Save persistent changes
    
    // Refresh admin UI
    populateGreetingSelector();
    // Re-select the edited/added greeting in the dropdown
    greetingSelector.value = currentEditingGreetingId; 
    selectGreetingForEdit(currentEditingGreetingId); // Reload editor fields to reflect changes
    
    // Clear temporary image upload state after saving
    if (newImageObjectURL) {
        URL.revokeObjectURL(newImageObjectURL);
        newImageObjectURL = null;
        imageUploadInput.value = '';
        newGreetingImagePreview.classList.add('hidden');
        newGreetingImagePreview.src = '';
    }
});

// Initial load for admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadAdminGreetingsFromLocalStorage();
    populateGreetingSelector();
    populateImageAssetSelector();
    showOverlay(adminLoginOverlay); // Show login overlay immediately when admin.html loads
    greetingSelector.value = ''; // Reset selector
    currentEditingGreetingId = null; // No greeting selected initially
    isAddingNewGreeting = false;
    greetingEditor.classList.add('hidden'); // Hide editor until selection or new greeting
    clearEditorFields(); // Clear all fields
    toggleDeleteButton();
});