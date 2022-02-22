import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import {useState, useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import Row from "./Row";

function Adder(){
    const [numbers, setNumbers] = useState([{id: 0, value: 0, operation: '+', disableProp: false}]);
    const [dirty, setDirty] = useState(false);
    const [result, setResult] = useState(0);
    const [blockDelete, setBlockDelete] = useState(true);

    const addRow = () => {
        let id = numbers ? numbers.reduce((max, number) => number.id > max ? number.id : max, 0) + 1 : 0;
        const newNumber = {id: id, value: 0, operation: '+', disableProp: false};
        setNumbers((numbers)=> [...numbers, newNumber]);
        setBlockDelete(false);
    }

    useEffect(()=> {
        if(dirty){
          let total = 0;
          numbers.forEach((number) => (
              !number.disableProp && (number.operation === '+' ? total+=number.value : total-=number.value)
          ))
          setResult(total);
          setDirty(false);
        }
    }, [dirty, numbers]);

    return (
        <>
            <Box
                sx={{
                    paddingX: 2,
                    paddingBottom: 2,
                    paddingTop: 0.5,
                    border: 1,
                    borderColor: "#9E9E9E",
                    borderRadius: 1,
                    maxWidth: "950px",
                    margin: "auto",
                    marginTop: 5,
                }}>
                {numbers.length > 0 ? numbers.map((number, index) => (
                    <Row
                        key={number.id}
                        index={index}
                        number={number}
                        setNumbers={setNumbers}
                        setDirty={setDirty}
                        blockDelete={blockDelete}
                        setBlockDelete={setBlockDelete}
                    >
                    </Row>))
                   :  <></>}


                <Grid container sx={{marginTop: "50px"}}>
                    <Grid item xs={1}/>
                    <Grid item xs={8}>
                        <Typography variant="h6" component="div" sx={{ borderTop: 1, paddingY: 1, paddingLeft: 2, backgroundColor: '#EFEFEF', width:"90%"}}>
                            Result: {result}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Button sx={{ paddingY: 1 }} color="success" variant="outlined" startIcon={<AddCircleOutlineTwoToneIcon/>} onClick={addRow}>
                            Add Row
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
export default Adder;