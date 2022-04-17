// export const sleep = (ms) => {
//   return new Promise(resolve => setTimeout(() => {resolve()}, ms))
// }

function getImg(num) {
  return `../../assets/images/saunaImages/image${num}.png`
}

export const listOfItems = {
  items: [
    {
      id: 1,
      images: [getImg(1), getImg(3), getImg(7)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 1,
        price: 23200,
        time: 1612710400000,
      },
    },
    {
      id: 2,
      images: [getImg(1), getImg(2)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 3,
        price: 279000,
        time: 1613310400000,
      },
    },
    {
      id: 3,
      images: [getImg(9)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 4,
        price: 200670,
        time: 1612670400000,
      },
    },
    {
      id: 4,
      images: [getImg(3), getImg(6), getImg(8)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 2,
        price: 21000,
        time: 1612410400000,
      },
    },
    {
      id: 5,
      images: [getImg(1), getImg(3), getImg(7), getImg(2)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 6,
        price: 20080,
        time: 1601310400000,
      },
    },
    {
      id: 6,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 8,
        price: 10000,
        time: 1612880400000,
      },
    },
    {
      id: 7,
      images: [getImg(7)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 7,
        price: 20094,
        time: 1612310890000,
      },
    },
    {
      id: 8,
      images: [getImg(5)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 5,
        price: 21170,
        time: 1685630400000,
      },
    },
    {
      id: 9,
      images: [getImg(3)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 16,
        price: 85000,
        time: 1612310400000,
      },
    },
    {
      id: 10,
      images: [getImg(6)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 20,
        price: 20255,
        time: 1612870400000,
      },
    },
    {
      id: 11,
      images: [getImg(1), getImg(8)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 17,
        price: 21500,
        time: 1612160400000,
      },
    },
    {
      id: 12,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Пожилые Сауны',
      },
      data: {
        pupularity: 18,
        price: 30011,
        time: 1612314400000,
      },
    },
    {
      id: 13,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 11,
        price: 3301,
        time: 1612310550000,
      },
    },
    {
      id: 14,
      images: [getImg(6), getImg(3)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 12,
        price: 65000,
        time: 1612310400000,
      },
    },
    {
      id: 15,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 19,
        price: 34560,
        time: 1612310660000,
      },
    },
    {
      id: 16,
      images: [getImg(6), getImg(3)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 9,
        price: 29900,
        time: 1612310477000,
      },
    },
    {
      id: 17,
      images: [getImg(6), getImg(7)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 13,
        price: 20570,
        time: 1612310408800,
      },
    },
    {
      id: 18,
      images: [getImg(2), getImg(3), getImg(5)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 10,
        price: 23040,
        time: 1612231000000,
      },
    },
    {
      id: 19,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 14,
        price: 21200,
        time: 1612350400000,
      },
    },
    {
      id: 20,
      images: [getImg(1)],
      feedback: {
        comments: 1,
        likes: 4
      },
      description: {
        label: 'Cауна‧такой-то‧размер',
        adress: 'такой-то адрес',
        company: 'Контакт Плюс',
      },
      data: {
        pupularity: 15,
        price: 214000,
        time: 1612301400000,
      },
    },
  ]
}