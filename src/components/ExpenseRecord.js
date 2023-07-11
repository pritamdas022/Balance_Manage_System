import React from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecord } from "../Redux/ExpenseDataSlice";
const ExpenseRecord = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.exp);
  console.log("exp", data.expdata);
  const totalAmounts = data?.expdata?.map((record) => record.expamu);
  const expTotal = totalAmounts?.reduce(
    (acc, curr) => acc + parseFloat(curr),
    0
  );

  const handleClick = (index) => {
    dispatch(deleteRecord(index));
  };
  return (
    <div>
      <h3>Total Expence: {expTotal}</h3>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Amount Details No</th>
            <th>Expense Amount</th>
            <th>Expense Amount Name</th>
            <th>Expense Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.expdata?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.expamu}</td>
              <td>{item.expname}</td>
              <td>{item.exptype}</td>
              <td>{item.expdate}</td>
              <td>
                <Button variant="primary" onClick={() => handleClick(index)}>
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

export default ExpenseRecord;
