import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@material-ui/core'
import PageContainerContent from '../../../components/ui/page-container/page-container-content.component'
import Dialog from '../../../components/ui/dialog'
import SendAmountRow from './send-amount-row'
import SendGasRow from './send-gas-row'
import SendHexDataRow from './send-hex-data-row'
import SendAssetRow from './send-asset-row'
import TextField from '../../../components/ui/text-field'

export default class SendContent extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    updateGas: PropTypes.func,
    showAddToAddressBookModal: PropTypes.func,
    showHexData: PropTypes.bool,
    contact: PropTypes.object,
    isOwnedAccount: PropTypes.bool,
    warning: PropTypes.string,
    privateTx: PropTypes.bool,
    privateTxTimeout: PropTypes.number,
    updateSendPrivateTx: PropTypes.func,
    showPrivateTx: PropTypes.bool,
  }

  updateGas = (updateData) => this.props.updateGas(updateData)

  togglePrivateTx = (event) => {
    event.preventDefault()
    this.props.updateSendPrivateTx(
      !this.props.privateTx,
      this.props.privateTxTimeout,
    )
  }

  setPrivateTxTimeout = (value) => {
    console.log(`setting private timeout ${value}`)
    this.props.updateSendPrivateTx(
      this.props.privateTx,
      value,
    )
  }

  render() {
    const { warning, privateTx, showPrivateTx, privateTxTimeout } = this.props
    return (
      <PageContainerContent>
        <div className="send-v2__form">
          {warning && this.renderWarning()}
          {this.maybeRenderAddContact()}
          <SendAssetRow />
          <SendAmountRow updateGas={this.updateGas} />
          <SendGasRow />
          {this.props.showHexData && (
            <SendHexDataRow updateGas={this.updateGas} />
          )}
          {showPrivateTx && (
            <>
              <Checkbox
                id="sendContent_privateTransaction"
                checked={privateTx}
                disabled={false}
                onClick={this.togglePrivateTx}
              />
              <label htmlFor="sendContent_privateTransaction">
                Private Transaction
              </label>
              <div className="confirm-detail-row">
                <div className="confirm-detail-row__label">
                  Private Transaction Timeout
                </div>
                <TextField
                  type="number"
                  min="0"
                  placeholder="0"
                  fullWidth
                  margin="dense"
                  value={privateTxTimeout}
                  onChange={({ target: { value } }) => {
                    this.setPrivateTxTimeout(value)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </PageContainerContent>
    )
  }

  maybeRenderAddContact() {
    const { t } = this.context
    const {
      isOwnedAccount,
      showAddToAddressBookModal,
      contact = {},
    } = this.props

    if (isOwnedAccount || contact.name) {
      return null
    }

    return (
      <Dialog
        type="message"
        className="send__dialog"
        onClick={showAddToAddressBookModal}
      >
        {t('newAccountDetectedDialogMessage')}
      </Dialog>
    )
  }

  renderWarning() {
    const { t } = this.context
    const { warning } = this.props

    return (
      <Dialog type="warning" className="send__error-dialog">
        {t(warning)}
      </Dialog>
    )
  }
}
