import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import User from "@/models/User"
import Transaction from "@/models/Transaction"
import Notification from "@/models/Notification"
import Account from "@/models/Account"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

export const dynamic = "force-dynamic"

export default async function SeedPage() {
  let status = "idle"
  let error = null
  let seededUsers = []
  let seededTransactions = []
  let seededNotifications = []
  let seededAccounts = []

  try {
    await connectToDB()
    status = "loading"

    // Clear existing test data (optional)
    await User.deleteMany({ email: /@seedexample\.com$/i })
    await Transaction.deleteMany({ description: /Seed transaction/ })
    await Notification.deleteMany({ title: /Seed notification/ })
    await Account.deleteMany({ number: /^4532/ }) // Delete accounts with seed numbers

    // Seed 3 users with different roles
   // inside your try block:

const usersToSeed = [
  {
    userID: uuidv4(),
    username: "RegularUser1",
    email: "user1@seedexample.com",
    password: await bcrypt.hash("Password123", 10),
    role: "user",
    transactionPin: "1234",
    accountType: "personal",
    country: "Nigeria",
    legalFirstName: "John",
    legalLastName: "Doe",
  },
  {
    userID: uuidv4(),
    username: "RegularUser2",
    email: "user2@seedexample.com",
    password: await bcrypt.hash("Password123", 10),
    role: "user",
    transactionPin: "5678",
    accountType: "personal",
    country: "Nigeria",
    legalFirstName: "Jane",
    legalLastName: "Smith",
  },
  {
    userID: uuidv4(),
    username: "RegularUser3",
    email: "user3@seedexample.com",
    password: await bcrypt.hash("Password123", 10),
    role: "user",
    transactionPin: "9012",
    accountType: "personal",
    country: "Nigeria",
    legalFirstName: "Alice",
    legalLastName: "Brown",
  }
];


    // Insert users and get their IDs
    const insertedUsers = await User.insertMany(usersToSeed)
    seededUsers = insertedUsers.map(user => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role
    }))

    // Seed accounts for each user
    const accountTemplates = [
      {
        type: "Checking",
        number: "4532 1234 5678 9012",
        balance: 12345.67,
        availableBalance: 12345.67,
        color: "from-blue-600 to-blue-800",
        status: "active",
        expiryDate: "12/26",
        cvv: "123",
        interestRate: "0.01%",
        openedDate: "Jan 15, 2020",
        transactions: 156,
      },
      {
        type: "Savings",
        number: "4532 7891 2345 6789",
        balance: 25678.9,
        availableBalance: 25678.9,
        color: "from-green-600 to-green-800",
        status: "active",
        expiryDate: "08/27",
        cvv: "456",
        interestRate: "1.25%",
        openedDate: "Mar 22, 2019",
        transactions: 42,
      },
      {
        type: "Credit",
        number: "4532 2468 1357 9024",
        balance: 3456.78,
        availableBalance: 6543.22,
        color: "from-purple-600 to-purple-800",
        status: "active",
        expiryDate: "03/28",
        cvv: "789",
        creditLimit: 10000,
        interestRate: "18.99%",
        openedDate: "Sep 10, 2021",
        transactions: 87,
        paymentDue: "Jan 15, 2024",
        minimumPayment: 35.0,
      }
    ]

    // Seed transactions and notifications for each user
    const transactionCategories = ["Food", "Transport", "Entertainment", "Utilities", "Shopping"]
    const notificationTypes = ["success", "warning", "info", "error"]
    
    for (const user of insertedUsers) {
      // Create accounts for this user
      const userAccounts = []
      for (const template of accountTemplates) {
        // Generate unique account number by changing last 4 digits
        const lastFour = Math.floor(1000 + Math.random() * 9000)
        const accountNumber = template.number.slice(0, -4) + lastFour
        
        const account = {
          user: user._id,
          ...template,
          number: accountNumber
        }
        userAccounts.push(account)
      }
      
      // Create 5 transactions per user
      const userTransactions = []
      for (let i = 0; i < 5; i++) {
        const isCredit = Math.random() > 0.5
        const transaction = {
          user: user._id,
          type: isCredit ? "credit" : "debit",
          amount: Math.floor(Math.random() * 500) + 1,
          description: `Seed transaction ${i+1} for ${user.username}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
          time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
          category: transactionCategories[Math.floor(Math.random() * transactionCategories.length)],
          account: accountTemplates[Math.floor(Math.random() * accountTemplates.length)].type,
          reference: `TXN-${uuidv4().substring(0, 8)}`,
          status: "completed",
          avatar: isCredit ? "💰" : "💸"
        }
        userTransactions.push(transaction)
      }
      
      // Create 3 notifications per user
      const userNotifications = []
      for (let i = 0; i < 3; i++) {
        const notification = {
          user: user._id,
          title: `Seed notification ${i+1} for ${user.username}`,
          message: `This is a sample notification message ${i+1}`,
          time: `${Math.floor(Math.random() * 24)} hours ago`,
          type: notificationTypes[Math.floor(Math.random() * notificationTypes.length)],
          isRead: Math.random() > 0.5
        }
        userNotifications.push(notification)
      }

      // Insert accounts, transactions and notifications for this user
      const insertedAccounts = await Account.insertMany(userAccounts)
      const insertedTransactions = await Transaction.insertMany(userTransactions)
      const insertedNotifications = await Notification.insertMany(userNotifications)
      
      seededAccounts.push(...insertedAccounts.map(a => ({
        _id: a._id.toString(),
        user: a.user.toString(),
        type: a.type,
        number: a.number
      })))
      
      seededTransactions.push(...insertedTransactions.map(t => ({
        _id: t._id.toString(),
        user: t.user.toString(),
        amount: t.amount,
        type: t.type
      })))
      
      seededNotifications.push(...insertedNotifications.map(n => ({
        _id: n._id.toString(),
        user: n.user.toString(),
        title: n.title,
        type: n.type
      })))
    }

    status = "done"
  } catch (err) {
    error = err.message || "Unknown error"
    status = "error"
  } finally {
    await mongoose.disconnect()
  }

  return (
    <div>
      <h1>Seed Database</h1>
      {status === "done" && (
        <div style={{ color: "green" }}>
          <p>Seeding complete! Users, accounts, transactions and notifications have been seeded.</p>
          
          <h3>Seeded Users:</h3>
          <ul>
            {seededUsers.map(user => (
              <li key={user._id}>
                ID: {user._id} | Username: {user.username} | Email: {user.email} | Role: {user.role}
              </li>
            ))}
          </ul>

          <h3>Seeded Accounts:</h3>
          <p>Total: {seededAccounts.length} accounts created (3 per user)</p>
          <ul>
            {seededAccounts.slice(0, 5).map(a => (
              <li key={a._id}>
                ID: {a._id} | User: {a.user} | Type: {a.type} | Number: {a.number}
              </li>
            ))}
            {seededAccounts.length > 5 && <li>...and {seededAccounts.length - 5} more</li>}
          </ul>

          <h3>Seeded Transactions:</h3>
          <p>Total: {seededTransactions.length} transactions created (5 per user)</p>
          <ul>
            {seededTransactions.slice(0, 5).map(t => (
              <li key={t._id}>
                ID: {t._id} | User: {t.user} | Amount: {t.amount} | Type: {t.type}
              </li>
            ))}
            {seededTransactions.length > 5 && <li>...and {seededTransactions.length - 5} more</li>}
          </ul>

          <h3>Seeded Notifications:</h3>
          <p>Total: {seededNotifications.length} notifications created (3 per user)</p>
          <ul>
            {seededNotifications.slice(0, 5).map(n => (
              <li key={n._id}>
                ID: {n._id} | User: {n.user} | Title: {n.title} | Type: {n.type}
              </li>
            ))}
            {seededNotifications.length > 5 && <li>...and {seededNotifications.length - 5} more</li>}
          </ul>
        </div>
      )}
      {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
      {status === "idle" && <p>Ready to seed.</p>}
      {status === "loading" && <p>Seeding in progress...</p>}
    </div>
  )
}