import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxx from '../Auxx/Auxx';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        // eslint-disable-next-line no-undef
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        // eslint-disable-next-line no-undef
        errorConfirmedHandler = () => {
            this.setState( { error: null } );
        }

        render () {
            return (
                <Auxx>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxx>
            );
        }
    }
}

export default withErrorHandler;