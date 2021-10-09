import { useEffect, useState } from "react";
import success from "../images/success.png";
import fail from "../images/fail.png";
import pending from "../images/pending.gif";

const Tasks = (props: any) => {
    const [threadStatus, setThreadStatus] = useState<any>([]);
    useEffect(() => {
        try {
            const status = props.threadStatus;
            const splitStatus = String(status).split('&');
            const arrayStatus = [];
            for (let i = 0; i < splitStatus.length; i ++) {
                arrayStatus.push(splitStatus[i].split('=')[1]);
            }
            setThreadStatus(arrayStatus);
        } catch(error: any) {}
        return;
    }, []);
    function SetItemResult(props: any) {
        let status = '';
        if (props.status === '') {
            status = '0';
        } else {
            const split = String(props.status).split('&');
            const splitStatus = String(split[props.id+1]).split(`thread${props.id}=`);
            if (splitStatus[1] === undefined) {
                status = '0';
            } else {
                status = splitStatus[1];
            }
        }
        
        if (status === '0') {
            return <img className="item-result" src={pending} style={{opacity:0}} />;
        } else if (status === '1') {
            return <img className="item-result pending" src={pending} />
        } else if (status === '2') {
            return <img className="item-result" src={success} />
        } else {
            return <img className="item-result" src={fail} />
        }
    }
    return (
        <div className="tasks-div">
            {
                props.tasks.map((item:any) => (
                    <div className="item-div">
                        <span className="item-subscript">
                            {`Thread${item.id+1}:`}<span className="wallet">{item.wallet}</span> is minting to <span className="token">{item.token}</span>
                        </span>
                        <SetItemResult id={item.id} status={props.threadStatus} />
                    </div>
                ))
            }
        </div>
    )
}

export default Tasks;