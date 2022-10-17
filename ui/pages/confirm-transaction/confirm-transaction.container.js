import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  setTransactionToConfirm,
  clearConfirmTransaction,
} from '../../ducks/confirm-transaction/confirm-transaction.duck';
import { isTokenMethodAction } from '../../helpers/utils/transactions.util';
import { fetchBasicGasEstimates } from '../../ducks/gas/gas.duck';

import {
  getContractMethodData,
  getTokenParams,
  setDefaultHomeActiveTabName,
} from '../../store/actions';
import {
  unconfirmedTransactionsListSelector,
  getFailedTransactionsToDisplayCount,
  getFailedTransactionsToDisplay,
} from '../../selectors';
import { getMostRecentOverviewPage } from '../../ducks/history/history';
import ConfirmTransaction from './confirm-transaction.component';

const mapStateToProps = (state, ownProps) => {
  const {
    metamask: { unapprovedTxs },
    send,
  } = state;
  const {
    match: { params = {} },
  } = ownProps;
  const { id } = params;
  console.log('%%%%%%%%%%%%%%%');
  console.log('%%% id', id);
  const unconfirmedTransactions = unconfirmedTransactionsListSelector(state);
  console.log('%%% unconfirmedTransactions', unconfirmedTransactions);
  const failedTransactionsToDisplay = getFailedTransactionsToDisplay(state);
  console.log('%%% failedTransactionsToDisplay', failedTransactionsToDisplay);
  const totalUnconfirmed = unconfirmedTransactions.length;
  console.log('%%% totalUnconfirmed', totalUnconfirmed);
  const transaction =
    totalUnconfirmed || Object.keys(failedTransactionsToDisplay).length
      ? unapprovedTxs[id] ||
        failedTransactionsToDisplay[id] ||
        unconfirmedTransactions[0]
      : {};
  console.log('%%% transaction', transaction);
  const { id: transactionId, type } = transaction;

  return {
    totalUnapprovedCount: totalUnconfirmed,
    send,
    unapprovedTxs,
    id,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
    paramsTransactionId: id && String(id),
    transactionId: transactionId && String(transactionId),
    transaction,
    isTokenMethodAction: isTokenMethodAction(type),
    failedTransactionsToDisplayCount: getFailedTransactionsToDisplayCount(
      state,
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTransactionToConfirm: (transactionId) => {
      dispatch(setTransactionToConfirm(transactionId));
    },
    clearConfirmTransaction: () => dispatch(clearConfirmTransaction()),
    fetchBasicGasEstimates: () => dispatch(fetchBasicGasEstimates()),
    getContractMethodData: (data) => dispatch(getContractMethodData(data)),
    getTokenParams: (tokenAddress) => dispatch(getTokenParams(tokenAddress)),
    setDefaultHomeActiveTabName: (tabName) =>
      dispatch(setDefaultHomeActiveTabName(tabName)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmTransaction);
