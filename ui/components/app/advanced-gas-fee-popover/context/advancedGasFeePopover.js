import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AdvancedGasFeePopoverContext = createContext({});

export const AdvancedGasFeePopoverContextProvider = ({ children }) => {
  const [gasLimit, setGasLimit] = useState();
  const [maxFeePerGas, setMaxFeePerGas] = useState();
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState();
  const [errors, setErrors] = useState({
    maxFeePerGas: false,
    maxPriorityFeePerGas: false,
  });

  const setErrorValue = useCallback(
    (field, value) => {
      if (errors[field] !== value) {
        setErrors({ ...errors, [field]: value });
      }
    },
    [errors, setErrors],
  );
  const [baseFeeMultiplier, setBaseFeeMultiplier] = useState();
  const [baseFeeGWEI, setBaseFeeGWEI] = useState();

  return (
    <AdvancedGasFeePopoverContext.Provider
      value={{
        gasLimit,
        hasErrors: errors.maxFeePerGas || errors.maxPriorityFeePerGas,
        baseFeeGWEI,
        baseFeeMultiplier,
        maxFeePerGas,
        maxPriorityFeePerGas,
        setErrorValue,
        setGasLimit,
        setMaxPriorityFeePerGas,
        setMaxFeePerGas,
        setBaseFeeGWEI,
        setBaseFeeMultiplier,
      }}
    >
      {children}
    </AdvancedGasFeePopoverContext.Provider>
  );
};

export function useAdvancedGasFeePopoverContext() {
  return useContext(AdvancedGasFeePopoverContext);
}

AdvancedGasFeePopoverContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
