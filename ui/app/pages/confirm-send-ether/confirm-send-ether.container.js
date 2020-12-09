import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { updateSend } from '../../store/actions'
import { clearConfirmTransaction } from '../../ducks/confirm-transaction/confirm-transaction.duck'
import ConfirmSendEther from './confirm-send-ether.component'

const mapStateToProps = (state) => {
  const {
    confirmTransaction: { txData: { txParams, privateTx } = {} },
  } = state

  return {
    txParams,
    privateTx,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editTransaction: (txData, privateTx) => {
      const { id, txParams } = txData
      const { from, gas: gasLimit, gasPrice, to, value: amount } = txParams

      dispatch(
        updateSend({
          from,
          gasLimit,
          gasPrice,
          gasTotal: null,
          to,
          amount,
          errors: { to: null, amount: null },
          editingTransactionId: id?.toString(),
          privateTx,
        }),
      )

      dispatch(clearConfirmTransaction())
    },
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmSendEther)
