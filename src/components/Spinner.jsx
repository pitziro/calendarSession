import { Spin } from 'antd'
const Spinner = () => {
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
         }}
      >
         <Spin size="large" />
      </div>
   )
}

export default Spinner
