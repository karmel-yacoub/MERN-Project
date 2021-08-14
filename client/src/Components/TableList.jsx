import React , {useState , useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import axios from "axios";
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

const getProperty = (obj, prop) => {
  var parts = prop.split(".");

  if (Array.isArray(parts)) {
    var last = parts.length > 1 ? parts.pop() : parts;
    var l = parts.length,
      i = 1,
      current = parts[0];

    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }

    if (typeof obj === "object") {
      return obj[last];
    }
    return obj;
  } else {
    throw "parts is not valid array";
  }
};

const ButtonLink = prop => {
  return (
    <Button
      to={prop.link}
      variant="contained"
      type="button"
      size="small"
      className={"button-classes"}
      startIcon={prop.icon}
    />
  );
};



const TableList = ({ data, tableHeaders, tableBodies ,setReRender , reRender }) => {

  const classes = useStyles();
  // console.log('ddd' , tableBodies[5])
  const [delivery , setDelivery] = useState('')


  const onClickChangeStatus = (e,id) =>{
    axios.put('http://localhost:8000/api/orders/status/'+id )
    .then(res => {
      setReRender(!reRender)
    })
  }

  const onClickHandler =(e , id)=>{
    console.log("id" , id)
    console.log('delivery' , delivery)
    axios.put('http://localhost:8000/api/orders/delivery/' + id,{
      delivery
    }) 
    .then(setReRender(!reRender))
    .catch(err => console.log(err))
    setReRender(!reRender)

  }

  console.log('data' , data)

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data , idx) => (
              <TableRow key={idx}>
                {tableBodies.map((body,idx) =>
                  typeof body === "string" ? (
                    <TableCell key={body}>{getProperty(data, body)}</TableCell>
                  ) : 
                  null
                )}

                {
                  data["delivery"] === undefined ?
                  <>
                    <TableCell >
                    <select onChange={(e)=>setDelivery(e.target.value)}>
                      <option value='' hidden></option>
                      {tableBodies[5].map((item,idx)=>{
                        return <option key={idx} value={item._id}>{item.name}</option>
                      })}
                    </select>
                  </TableCell>
                  
                  <TableCell >
                    <button onClick={ (e) => onClickHandler(e , data._id)}>Select Delivery</button>
                  </TableCell>
                </>
                :
                  null
                }

                {
                  data.status === 'requested' ?
                  <TableCell >
                    <button onClick={ (e) => onClickChangeStatus(e,data._id)}>Accept</button>
                  </TableCell>
                  :
                  data.status === 'accepted' ?
                  <TableCell >
                    <button onClick={ (e) => onClickChangeStatus(e,data._id)}>Ready</button>
                  </TableCell>
                  :
                  null
                }
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TableList
