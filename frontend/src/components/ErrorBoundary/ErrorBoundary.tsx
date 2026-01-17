import { Component, type ReactNode } from "react";
import { Column, Grid, InlineNotification, Link, Row } from "@carbon/react";
import React from "react";

interface Props {
    /** UI to render when an error occurs */
    fallback?: ReactNode;

    /** Child components protected by this boundary */
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: unknown) {
        //send this to monitoring tools
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div>

                        <Row style={{ background: 'black', height: '100vh' }}>
                            <Column sm={3} lg={3} md={3}></Column>
                            <Column  sm={10} lg={10} md={10} >
                                <div>
                                    {this.props.fallback ?? (
                                        <React.Fragment>
                                            <InlineNotification
                                                style={{ marginTop: '30%' }}
                                                kind="error"
                                                title="Something went wrong"
                                                subtitle="Please refresh the page or try again later."
                                                lowContrast
                                            />

                                            <div style={{ color: 'white', marginTop: '3rem' }}>
                                                Please try again after sometime or contact
                                                administrator. We hope one of these pages will help you find what
                                                you are looking for:

                                                <Link href="https://github.com/shrutinandan/mini-project-management">Check out</Link>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </div>
                            </Column>

                        </Row>

                    </div></>
            );
        }

        return this.props.children;
    }
}
