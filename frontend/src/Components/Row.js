import {ButtonGroup, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Row(props){
    const {number, setNumbers, setDirty, blockDelete, setBlockDelete} = props;
    const operations = ['+', '-'];
    const min = 0;

    const deleteNumber = (id) => {
        setNumbers(oldNumbers => {
            let elements =  oldNumbers.filter(number => number.id !== id);
            if (elements.length === 1)
                setBlockDelete(true);
            return elements;
        });
        setDirty(true);
    }

    const disableNumber = (id, booleanValue) => {
        setNumbers(oldNumbers => {
            return oldNumbers.map((number) => {
                if (number.id === id) {
                    return {id: number.id, value: number.value, operation: number.operation, disableProp: booleanValue}; // return a new object: do not simply change content
                } else {
                    return number;
                }
            });
        });
        setDirty(true);
    }

    const handleChangeOperation = (id, event) => {
        setNumbers(oldNumbers => {
            return oldNumbers.map((number) => {
                if (number.id === id) {
                    return {id: number.id, value: number.value, operation: event.target.value, disableProp: number.disableProp};
                } else {
                    return number;
                }
            });
        });
        setDirty(true);
    }

    const handleChangeValue = (id, event) => {
        //if negative, set to min value
        let value = +event.target.value;
        if(value < min){
            value = min;
        }

        setNumbers(oldNumbers => {
            return oldNumbers.map((number) => {
                if (number.id === id) {
                    return {id: number.id, value: value, operation: number.operation, disableProp: number.disableProp};
                } else {
                    return number;
                }
            });
        });
        setDirty(true);
    }

    return (
        <Grid container sx={{marginTop: 1.5}}>
            <Grid item xs={1}/>
            <Grid item xs={4}>
                <TextField
                    id="filled-select"
                    select
                    label="Operation"
                    value={number.operation}
                    helperText="Select the operation"
                    variant="filled"
                    size="small"
                    sx={{width: '80%'}}
                    disabled={number.disableProp}
                    FormHelperTextProps={{

                    }}
                    onChange={(e) => handleChangeOperation(number.id, e)}
                >
                    {operations.map((operation) => (
                        <MenuItem key={operation} value={operation}>
                            {operation}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    helperText="Select the number"
                    inputProps={{ min }}
                    style={{width: '80%'}}
                    value={number.value}
                    onChange={(e) => handleChangeValue(number.id, e)}
                    variant="filled"
                    size="small"
                    disabled={number.disableProp}
                />
            </Grid>
            <Grid item xs={3}>
                <ButtonGroup sx={{marginTop: 1, display: { xs: 'none', md: 'block' } }} variant="outlined" aria-label="outlined button group">
                    <Button color="error" startIcon={<DeleteOutlineIcon/>} size="small" disabled={blockDelete} onClick={() => deleteNumber(number.id)}>
                        Delete
                    </Button>
                    {number.disableProp ?
                        <Button color="success" startIcon={<CheckIcon/>} size="small" onClick={() => disableNumber(number.id, false)}>
                            Enable
                        </Button>
                        :
                        <Button color="inherit" startIcon={<HighlightOffIcon/>} size="small" onClick={() => disableNumber(number.id, true)}>
                            Disable
                        </Button>
                    }
                </ButtonGroup>
                <ButtonGroup sx={{marginTop: 1, display: { xs: 'block', md: 'none' } }} variant="outlined" aria-label="outlined button group">
                    <Button color="error" startIcon={<DeleteOutlineIcon/>} size="small" onClick={() => deleteNumber(number.id)}>
                    </Button>
                    {number.disableProp ?
                        <Button color="success" startIcon={<CheckIcon/>} size="small" onClick={() => disableNumber(number.id, false)}>
                        </Button>
                        :
                        <Button color="inherit" startIcon={<HighlightOffIcon/>} size="small" onClick={() => disableNumber(number.id, true)}>
                        </Button>
                    }
                </ButtonGroup>
            </Grid>
        </Grid>
    );

}

export default Row;