import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { deleteRecord } from "../Redux/IncomeDataSlice";
const IncomeRecord = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.incom);
  console.log("incom", Data.incomdata);
  const totalAmounts = Data?.incomdata?.map((record) => record.amount);
  const incomTotal = totalAmounts?.reduce(
    (acc, curr) => acc + parseFloat(curr),
    0
  );
  const handlDelete = (index) => {
    dispatch(deleteRecord(index));
  };
  return (
    <div>
      <h3>Total Income : {incomTotal}</h3>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Amount Details No</th>
            <th>Amount</th>
            <th>Amount Name</th>
            <th>Amount Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Data?.incomdata?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.amount}</td>
              <td>{item.amuname}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td>
                <Button variant="primary" onClick={() => handlDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default IncomeRecord;
