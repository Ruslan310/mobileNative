import {
    compose,
    withHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import TermsAndConditionsModal from "./TermsAndConditionsView";

export default compose(
    inject((stores) => ({
        auth: stores.auth,
        isLoading: stores.auth.resetPassword.inProgress,
        isError: stores.auth.resetPassword.isError,
    })),

    withHandlers({
        onCloseModal: (props) => () => {
            props.onCloseModal();
        },
    }),
)(TermsAndConditionsModal);
