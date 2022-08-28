import {
   Button,
   MenuItem,
   Select,
   TextField,
   InputLabel,
   FormControl,
   Chip,
   Autocomplete,
   LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "../pages/Songs/song.css";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function AddTrack() {
   const names = [
      "Admin",
      "Oliver Hansen",
      "Van Henry",
      "April Tucker",
      "Ralph Hubbard",
      "Omar Alexander",
      "Carlos Abbott",
      "Miriam Wagner",
      "Bradley Wilkerson",
      "Virginia Andrews",
      "Kelly Snyder",
   ];

   let schema = yup.object().shape({
      title: yup.string().required(),
      songImg: yup.mixed().test("required", "please select img", (value) => {
         return value && value.length;
      }),
      song: yup.mixed().test("required", "please select song", (value) => {
         return value && value.length;
      }),
      description: yup.string().required(),
      artists: yup.array().required(),
      album: yup.string().required(),
      duration: yup.number().required(),
      genres: yup.array().required(),
      description: yup.string().required(),
      tags: yup.array().required(),
   });

   const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
      control,
      setValue,
   } = useForm({
      mode: "onTouched",
      resolver: yupResolver(schema),
   });

   const [selectedTags, setSelectedTags] = useState([]);
   const [inputTag, setInputTag] = useState();
   const [selectedGenresList, setSelectedGenresList] = useState([]);

   const tagsChipHandleDelete = (e, value) => {
      setSelectedTags((tags) => {
         return tags.filter((e) => e !== value);
      });
   };

   const handleTagsKeyDown = (e) => {
      if (e.key === "Enter" && inputTag != "") {
         if (selectedTags.indexOf(inputTag) === -1) {
            setSelectedTags([...selectedTags, inputTag]);
            setInputTag("");
         } else {
            setInputTag("");
         }
      }
   };

   const formSubmit = (data, e) => {
      e.preventDefault();
      console.log(data);
      console.log("form submitted");
   };

   console.log(errors);

   return (
      <div className="add-track-container">
         <Box sx={{ width: "100%", marginBottom: "30px" }}>
            <h5 className="song-label">sample.mp4</h5>
            <LinearProgress variant="determinate" value={30} />
         </Box>
         <form action="" method="post" onSubmit={handleSubmit(formSubmit)}>
            <div className="left-side-box">
               <div className="img-box">
                  <img src={require("../assets/album.jpg")} />
                  <Button
                     className="upload-btn"
                     variant="contained"
                     component="label"
                  >
                     Upload image
                     <input
                        hidden
                        accept="image/*"
                        type="file"
                        {...register("songImg")}
                        name="songImg"
                     />
                  </Button>
               </div>
               <Button
                  className="upload-track-btn"
                  variant="contained"
                  component="label"
               >
                  Upload Track
                  <input
                     hidden
                     accept=".mp3"
                     type="file"
                     name="song"
                     {...register("song")}
                  />
               </Button>
            </div>
            <div className="right-side-box">
               <TextField
                  className="input"
                  label="Title"
                  variant="outlined"
                  {...register("title")}
                  name="title"
               />

               <Autocomplete
                  options={names}
                  className="input"
                  {...register("album")}
                  autoHighlight
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                     <TextField {...params} label="Album" name="album" />
                  )}
               />

               <Controller
                  control={control}
                  name="artists"
                  render={({ field }) => (
                     <Autocomplete
                        options={names}
                        className="input"
                        autoHighlight
                        multiple={true}
                        getOptionLabel={(option) => option}
                        onChange={(e, value) => setValue("artists", value)}
                        name="artists"
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label="Artists"
                              name="artists"
                           />
                        )}
                     />
                  )}
               />

               <TextField
                  className="input"
                  type={"number"}
                  label="Duration(ms)"
                  variant="outlined"
                  {...register("duration")}
                  name="duration"
               />

               <Controller
                  name="genres"
                  control={control}
                  render={({ field }) => (
                     <Autocomplete
                        multiple
                        className="input"
                        autoHighlight
                        options={names}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        onChange={(e, value) => {
                           setValue("genres", value);
                        }}
                        name="genres"
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label="Genres"
                              name="genres"
                              placeholder="Genres"
                           />
                        )}
                     />
                  )}
               />

               <TextField
                  onKeyDown={handleTagsKeyDown}
                  onChange={(e) => {
                     setInputTag(e.target.value);
                     setValue("tags", selectedTags);
                  }}
                  className="input"
                  label="Tags"
                  placeholder="+ Add Tags"
                  value={inputTag}
                  name="tags"
                  InputProps={
                     selectedTags != ""
                        ? {
                             startAdornment: selectedTags.map((value) => (
                                <Chip
                                   label={value}
                                   className="tagChip"
                                   onDelete={(e) =>
                                      tagsChipHandleDelete(e, value)
                                   }
                                   onMouseDown={(event) => {
                                      event.stopPropagation();
                                   }}
                                />
                             )),
                          }
                        : null
                  }
               />
               <TextField
                  className="input"
                  multiline
                  rows={3}
                  label="Description"
                  variant="outlined"
                  {...register("description")}
                  name="description"
               />

               <div className="button-group">
                  <Button variant="contained" type="submit">
                     Save
                  </Button>
                  <Button className="reset-btn" type="reset">
                     Reset
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default AddTrack;
