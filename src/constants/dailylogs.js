const Users = [
    {
        id: 1,
        fullname: "John Doe",
        email: "jdoe@reckmi.com",
        phoneNumber: "0801",
        photo: require("../assets/images/me.jpg"),
        address: "Amet anim sit incididunt commodo esse sint",
    },
    {
        id: 2,
        fullname: "John Smith",
        email: "jsmith@reckmi.com",
        phoneNumber: "0802",
        photo: null,
        address: null

    },
    {
        id: 3,
        fullname: "John Adamu",
        email: "jadamu@reckmi.com",
        phoneNumber: "0803",
        photo: null,
        address: null
    },
]

const Wallet = [
    {
        id: 1,
        userId: Users[0].id,
        currentMoneyEarn: 13200,
        moneyEarnSoFar: 15000,
    },
    {
        id: 2,
        userId: Users[0].id,
        currentMoneyEarn: 13200,
        moneyEarnSoFar: 15000,
    },
    {
        id: 3,
        userId: Users[0].id,
        currentMoneyEarn: 13200,
        moneyEarnSoFar: 15000,
    },
]

const Logs = [
    {
        id: 1,
        copy: 50, 
        copyClosed: 100,
        print: 20, 
        printClosed: 120,
        amountTransfer: 150.0,
        availableCash: 2000.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-16",
    },
    {
        id: 2,
        copy: 40,
        copyClosed: 90,
        print: 15,
        printClosed: 130,
        amountTransfer: 100.0,
        availableCash: 2500.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-15",
    },
    {
        id: 3,
        copy: 70,
        copyClosed: 180,
        print: 30,
        printClosed: 200,
        amountTransfer: 500.0,
        availableCash: 1000.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-14",
    },
    {
        id: 4,
        copy: 25,
        copyClosed: 234,
        print: 10,
        printClosed: 231,
        amountTransfer: 50.0,
        availableCash: 500.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-13",
    },
    {
        id: 5,
        copy: 90,
        copyClosed: 910,
        print: 40,
        printClosed: 80,
        amountTransfer: 300.0,
        availableCash: 1700.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-12",
    },
    {
        id: 6,
        copy: 60,
        copyClosed: 60,
        print: 25,
        printClosed: 50,
        amountTransfer: 400.0,
        availableCash: 1200.0,
        grandTotal: 249,
        userId: Users[0].id,
        date: "2024-12-11",
    },
    {
        id: 7,
        copy: 80,
        copyClosed: 90,
        print: 35,
        printClosed: 45,
        amountTransfer: 200.0,
        availableCash: 2200.0,
        grandTotal: 249,
        userId: Users[2].id,
        date: "2024-12-10",
    },
];

export { Users, Wallet, Logs}
// Calculate total money transfer
// let totalMoneyTransfer = data.reduce((acc, item) => acc + item.amountTransfer, 0);
// console.log(`Total Money Transfer: ${totalMoneyTransfer}`);


// // Calculate total available cash
// let totalAvailableCash = data.reduce((acc, item) => acc + item.availableCash, 0);
// console.log(`Available cash: ${totalAvailableCash}`);

// let currentMoneyEarn = (totalMoneyTransfer + totalAvailableCash) * 0.15
// console.log(`Current Money Earn : ${currentMoneyEarn}`)
