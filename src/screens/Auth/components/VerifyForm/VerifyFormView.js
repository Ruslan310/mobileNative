import React from 'react';
import {View} from "react-native";
import s from "../ResetPassword/styles";
import CheckedComponent from "./components/CheckedComponent";
import SuccessComponent from "./components/SuccessComponent";

const VerifyFormView = ({
                          isSuccess,
                          onChange,
                          activeField,
                          checkedCode,
                          resentEmail,
                          isSend,
                          firstName,
                          email,
                          root
}) => {

  const contentComponent = () => {
    if (isSuccess) return <SuccessComponent firstName={firstName} />;
    // return <SuccessComponent onChange={onChange} firstName={firstName} email={email} />;

    return <CheckedComponent
      isSend={isSend}
      resentEmail={resentEmail}
      checkedCode={checkedCode}
      onChange={onChange}
      email={email}
      firstName={firstName}
      activeField={activeField}
      root={root}
    />
  };

  return (
    <View style={s.container}>
      <View style={s.circle}/>
      <View style={s.viewContainer}>
        <React.Fragment>
          {contentComponent()}
        </React.Fragment>
      </View>
    </View>
  );
};

export default VerifyFormView;