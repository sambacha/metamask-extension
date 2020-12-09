import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageContainerContent from '../../../components/ui/page-container/page-container-content.component'
import Dialog from '../../../components/ui/dialog'
import SendAmountRow from './send-amount-row'
import SendGasRow from './send-gas-row'
import SendHexDataRow from './send-hex-data-row'
import SendAssetRow from './send-asset-row'
import { Checkbox } from '@material-ui/core'

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
    updateSendPrivateTx: PropTypes.func,
  }

  updateGas = (updateData) => this.props.updateGas(updateData)

  togglePrivateTx = (event) => {
    event.preventDefault()
    this.props.updateSendPrivateTx(!this.props.privateTx)
  }

  render() {
    const { warning, privateTx } = this.props
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
          <Checkbox
            id="sendContent_privateTransaction"
            checked={privateTx}
            disabled={false}
            onClick={this.togglePrivateTx}
          />
          <label htmlFor="sendContent_privateTransaction">
            Private Transaction
          </label>
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
