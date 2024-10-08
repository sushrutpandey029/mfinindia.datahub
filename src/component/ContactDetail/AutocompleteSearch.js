import React,{useState,useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { BaseUrl, importContactApi,getContactListApi } from "../url/url";
import authHeaders from "../Service/AuthHeaders";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
const AutocompleteSearch = (props) =>{
    const [fieldName,setFieldName] = useState(props.fieldName);
    const [open1111, setOpen111] = React.useState(false);
    const [options1111, setOptions1111] = React.useState([]);
    const loading = open1111 && options1111.length === 0;

    const onChangeHandle = async value => {
        //console.log("va;iess",props.fieldName);
      const api = `${getContactListApi}?${props.fieldName}=${value}`;
      const response =  await axios.get(`${BaseUrl}/${api}`,{headers: authHeaders()});
      setOptions1111(response.data.data);
    };
    useEffect(() => {
      if (!open1111) {
        setOptions1111([]);
      }
    }, [open1111]);
  
    //console.log("options1111", options1111)

    return(
    <>
    <h2>{fieldName}</h2>
    <Autocomplete
        
        id="asynchronous-demo"
        style={{ width: 300 }}
        open={open1111}
        onOpen={() => {
          setOpen111(true);
        }}
        onClose={() => {
          setOpen111(false);
        }}
        getOptionSelected={(option, value) => option.Institution_f_name === value.Institution_f_name}
        getOptionLabel={option => option.Institution_f_name}
        options={options1111}
        loading={loading}
        renderInput={params => (
          <TextField
            {...params}
            label="Asynchronous"
            variant="outlined"
            onChange={ev => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
          
        )}
      /></>)
}

export default AutocompleteSearch;