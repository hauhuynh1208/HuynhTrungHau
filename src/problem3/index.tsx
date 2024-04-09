import React, { useMemo } from "react";

// not sure blockchain property is always existed, so I made it as optional
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain?: string;
}
// refactor
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
//added BoxProps
interface BoxProps {
  children: React.ReactNode;
}
//missing BoxProps
interface Props extends BoxProps {}
// I guess useWalletBalances return an array of WalletBalance
function useWalletBalances(): WalletBalance[] {
  return [];
}
function usePrices() {}

// remove Component:React.FC<Props> because React.FC is not needed anymore
// please refer attached img-1.png or https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets for more information
const WalletPage = (props: Props) => {
  const { children, ...rest } = props;
  // because balances is acted as array in the code block below,
  // so the resturn value of useWalletBalances should be an array
  const balances = useWalletBalances();
  const prices = usePrices();

  // as I guess, blockchain parameter should be string and if it is not
  // existed, it will be undefined
  const getPriority = (blockchain: string | undefined): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // blockchain property is missing from WalletBalance interface
        // getPriority function return a number so balancePriority should be number also
        // however, balancePriority is not used
        const balancePriority: number = getPriority(balance.blockchain);
        // variable lhsPriority haven't declared yet
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0; // no swap when left equal right
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        // missing WalletRow component
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  // refactor code from line 79 -> 99
  // by this implementation, we save one map()
  const row = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    const formatted = balance.amount.toFixed();
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// css
const classes = {
  row: {
    width: "100%",
  },
  column: {},
};
