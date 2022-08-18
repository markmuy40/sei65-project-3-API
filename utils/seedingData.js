// where the seeding data lives to populate the database
import bcrypt from 'bcrypt'
import CONSTS from '../const.js'

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}


const user = {
  admin: {
    email: 'emails@emails.com',
    userName: 'DaBoss',
    password: await hashPassword(CONSTS.ADMIN_HASHPASSWORD),
    role: 'admin', 
  },
  user: {
    email: 'moreemails@anotheremail.com',
    userName: 'Badman40',
    password: await hashPassword(CONSTS.USER_HASHPASSWORD),
    role: 'user', 
    _id: '62f554f5f8c09484d783db60',
  },
}


const topic = [
  {
    topic: 'Fire in London Bridge right now!',
    comments: 'Its right by the arches near borough market. anyone know what happened?!',
    imageURL: 'https://www.newsshopper.co.uk/resources/images/14483414.jpg?type=article-full',

  },
  {
    topic: 'Killing some downtime at the office and found a fun quiz site!',
    comments: 'Killing boredom with this https://sei-project2-quiz.netlify.app',
    imageURL: '',

  },
  {
    topic: 'Question: "What is the best area to live in London?',
    comments: 'Moving to London soon Let me know!',
    imageURL: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
  
  },
  {
    topic: 'Why does everyone invest in crypto?',
    comments: 'Because there\'s money to be made! look https://another-crypto-tracker.netlify.app',
    imageURL: '',
  
  },
  {
    topic: 'Poll: which Harry Potter saga character represents you the most?',
    comments: 'Here\'s a resource to find if you\'re more Slytherin or Ravenclaw https://netlify-thinks-florastocks-is-great.netlify.app',
    imageURL: 'https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2021/01/30155602/harry-potter-and-the-sorcerers-stone-700x380.jpg',
  
  },
  {
    topic: 'Can anyone help me by suggesting recipes for delicious cocktails?',
    comments: 'I found this https://cocktail-library.netlify.app/',
    imageURL: '',
  
  },
  {
    topic: 'UK inflation: Food costs push price rises to new 40-year high!!!',
    comments: 'I still remember when space raiders were 10p and we could get penny sweets!',
    imageURL: 'https://m.ftscrt.com/food/9c05f65e-7626-457e-a3d4-5645ef798d60.jpg',
  
  },
  {
    topic: 'Can Lewis Hamilton still win the F1 champsionship in 2022?',
    comments: 'I found an app that can track the driver and team standings this season. check it https://formula1-seasonresults.netlify.app',
    imageURL: 'https://static.wikia.nocookie.net/f1wikia/images/9/9f/LewisHam.png/revision/latest/scale-to-width-down/1000?cb=20220309110334',
  
  },
  {
    topic: 'On 19 July 2022 in London the thermometer exceeded 104 degrees fahrenheit!',
    comments: 'I\'ve been working on a coding course in my loft and it\'s too hot!',
    imageURL: 'https://www.insulationexpress.co.uk/media/amasty/blog/uploads/sites/9/2018/02/shutterstock_489852454-1.jpg',
  
  },
  {
    topic: '3 GA students just tried cloning a Reddit app!',
    comments: 'I love the colourway and interface.  For some reason i now want to order food for delivery, Dunno why!',
    imageURL: 'https://www.cnet.com/a/img/resize/06609a421a446f3c0ec5fce6806fe44460589001/2019/05/22/1b710a6b-5f4d-4987-a046-c23674b221a3/picard-meme-facepalm.jpg?auto=webp&fit=crop&height=675&precrop=1331,746,x109,y127&width=1200',
  
  },
  {
    topic: 'Rijks Museum goes online! check out their new website!',
    comments: 'Here\'s the link https://sei-project2-museum.netlify.app/  I love the colour scheme and fonts used.  Share your thoughts below.',
    imageURL: '',
  
  },
  {
    topic: 'Looking for a junior dev role in London...',
    comments: 'Anyone got an opening? let me know who i can contact.',
    imageURL: 'https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg',
  
  }
].map((topic) => ({ ...topic, createdBy: user.user._id }))

export default { topic, user }
