const users = [
  { id: 1, username: "lala", address: "Jakarta" },
  { id: 2, username: "lili", address: "Bandung" },
];

const transaction = [
  {
    user_id: 1,
    transaction: [
      { id: 1, status: "Selesai" },
      { id: 2, status: "Sedang dikirim" },
    ],
  },
  {
    user_id: 2,
    transaction: [
      { id: 1, status: "Selesai" },
      { id: 2, status: "Dibatalkan" },
    ],
  },
];

const detailTransaction = [
  { id: 1, productName: "Kopi Hitam", qty: 3, totalAmount: 3000 },
  { id: 2, productName: "Gula Pasir", qty: 2, totalAmount: 5000 },
];

function auth(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users.filter((item) => item.username === username));
    }, 500);
  });
}

function getTransaction(user_id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userTransaction = transaction.find((item) => item.user_id === user_id);
      if (userTransaction) {
        resolve(userTransaction.transaction);
      } else {
        resolve([]);
      }
    }, 500);
  });
}

function getDetailTransaction(transactionId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transactionDetail = detailTransaction.find((item) => item.id === transactionId);
      if (transactionDetail) {
        resolve(transactionDetail);
      } else {
        resolve({});
      }
    }, 500);
  });
}

async function getDetailTransactionAsync() {
  try {
    const users = await auth("lala");
    if (users.length > 0) {
      const user = users[0];
      const transactions = await getTransaction(user.id);
      if (transactions.length > 0) {
        const transactionId = transactions[0].id;
        const detailTransaction = await getDetailTransaction(transactionId);
        console.log("User:", user);
        console.log("Detail Transaction:", detailTransaction);
      } else {
        throw new Error("No transactions found");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
  }
}

getDetailTransactionAsync();
