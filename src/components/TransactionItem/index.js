// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onDelete} = props
  const {id, title, amount, type} = details

  const deleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="list">
      <p className="item-cell">{title}</p>
      <p className="item-cell">Rs {amount}</p>
      <p className="item-cell">{type}</p>
      <button
        type="button"
        className="button"
        data-testid="delete"
        onClick={deleteItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="img-delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
