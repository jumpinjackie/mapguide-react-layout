import * as React from 'react';

export type FormFrameShimProps = any;

export class FormFrameShim extends React.Component<FormFrameShimProps, any> {
    private _form: HTMLFormElement;
    private fnFormMounted: (form: HTMLFormElement) => void;
    constructor(props: FormFrameShimProps) {
        super(props);
        this.state = {
            target: "",
            action: "",
            params: []
        };
        this.fnFormMounted = this.onFormMounted.bind(this);
    }
    private onFormMounted(form: HTMLFormElement) {
        this._form = form;
    }
    submit(url: string, params: string[], target: string): void {
        this.setState({
            action: url, 
            params: params,
            target: target
        }, () => {
            //The form will have the updated content at this point
            this._form.submit();
        })
    }
    render(): JSX.Element {
        const { target, action, params } = this.state;
        return <form style={{ visibility: "hidden", width: 0, height: 0 }} ref={this.fnFormMounted} method="post" id="Frm" target={target} action={action} encType="application/x-www-form-urlencoded">
            {(() => {
                const fields = [] as JSX.Element[];
                for (let i = 0; i < params.length; i+=2) {
                    fields.push(<input id={`f${i}`} key={`f${i}`} type="hidden" name={params[i]} value={params[i+1]} />);
                }
                return fields;
            })()}
        </form>;
    }
}