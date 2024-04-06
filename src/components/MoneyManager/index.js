import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const optionType = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    console.log(optionType)
    const {displayText} = optionType
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteItem = id => {
    const {transactionList} = this.state
    const filterList = transactionList.filter(each => each.id !== id)
    this.setState({transactionList: filterList})
  }

  getIncome = () => {
    const {transactionList} = this.state
    let totalIncome = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        totalIncome += each.amount
      }
    })
    return totalIncome
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let totalExpense = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        totalExpense += each.amount
      }
    })
    return totalExpense
  }

  getBalance = () => {
    const {transactionList} = this.state
    let income = 0
    let expenses = 0
    let balance = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        income += each.amount
      } else {
        expenses += each.amount
      }
    })

    balance = income - expenses
    return balance
  }

  render() {
    const {titleInput, amountInput, transactionList} = this.state
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()
    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="profile-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="description">
              Welcome back to your
              <span className="highlite"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
            balanceAmount={balanceAmount}
          />
          <div className="transaction-container">
            <form className="form-container" onSubmit={this.onAddTransaction}>
              <h1>Add Transaction</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                type="text"
                placeholder="Title"
                id="title"
                onChange={this.onChangeTitle}
                value={titleInput}
              />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                className="input"
                type="text"
                placeholder="Amount"
                id="amount"
                onChange={this.onChangeAmount}
                value={amountInput}
              />
              <label className="label" htmlFor="type">
                TYPE
              </label>
              <select className="input" id="type" onChange={this.onChangeType}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1>History</h1>
              <div className="table-container">
                <ul className="table">
                  <li className="cell-container">
                    <p className="cell">Title</p>
                    <p className="cell">Amount</p>
                    <p className="cell">Type</p>
                  </li>
                  {transactionList.map(each => (
                    <TransactionItem
                      details={each}
                      key={each.id}
                      onDelete={this.onDeleteItem}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
