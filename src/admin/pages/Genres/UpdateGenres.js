import { Button, TextField, FormControlLabel, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateGenres() {
  let schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    id: yup.string().required(),
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

  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state;

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [genresActive, setGenresActive] = useState(
    rowData.status == "active" ? true : false
  );

  const formSubmit = async (data, e) => {
    e.preventDefault();

    setIsFormDisabled(true);

    axios({
      url: `${process.env.REACT_APP_API}admin/genres/updateGenres`,
      method: "post",
      data: {
        id: data.id,
        name: data.name,
        status: genresActive,
      },
    })
      .then((res) => {
        setIsFormDisabled(false);
        if (res.data === 1) {
          console.log(res);
          alert("Updated Successfully..");
          navigate("/admin/genres");
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
          <input
            type="hidden"
            value={rowData._id}
            name="id"
            {...register("id")}
          />
          <TextField
            className="input"
            label="Name"
            variant="outlined"
            {...register("name")}
            defaultValue={rowData.name}
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

export default UpdateGenres;
