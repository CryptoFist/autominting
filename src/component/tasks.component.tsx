import success from "../images/success.png";
import fail from "../images/fail.png";

const Tasks = (props: any) => {
    return (
        <div className="tasks-div">
            {
                props.tasks.map((item:any) => (
                    <div className="item-div">
                        <span className="item-subscript">
                            {`Thread${item.id+1}:`}<span className="wallet">{item.wallet}</span> is minting to <span className="token">{item.token}</span>
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Tasks;