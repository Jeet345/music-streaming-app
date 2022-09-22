import { Button, TextField, FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

function AddGenres() {
  let schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [genresActive, setGenresActive] = useState(true);

  const formSubmit = async (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    axios({
      url: "http://localhost:4000/admin/genres/addGenres",
      method: "post",
      data: {
        name: data.name,
        status: genresActive,
      },
    })
      .then((res) => {
        setIsFormDisabled(false);
        if (res.data === 1) {
          console.log(res);
          alert("submitted");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        setIsFormDisabled(false);
        console.log(err);
      });
  };

  console.log(errors);

  return (
    <div className="add-track-container">
      <form method="post" id="form" onSubmit={handleSubmit(formSubmit)}>
        <div className="right-side-box">
          <TextField
            className="input"
            label="Name"
            variant="outlined"
            {...register("name")}
            name="name"
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ""}
            disabled={isFormDisabled}
          />

          <FormControlLabel
            style={{ marginBottom: "20px", color: "white" }}
            control={
              <Switch
                checked={genresActive}
                onChange={() => {
                  setGenresActive(!genresActive);
                }}
                name="status"
              />
            }
            label="Active"
          />

          <div className="button-group">
            <Button variant="contained" type="submit" disabled={isFormDisabled}>
              Save
            </Button>
            <Button
              className="reset-btn"
              type="reset"
              disabled={isFormDisabled}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddGenres;
