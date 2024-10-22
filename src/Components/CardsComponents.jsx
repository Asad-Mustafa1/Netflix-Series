import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Pagination,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CardsComponent = () => {
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [mediaItems, setMediaItems] = useState([]);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const [sname, setSname] = useState("");
  const [title, setTitle] = useState("");
  const [imgsrc, setImgsrc] = useState("");
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const response = await axios.get("http://192.168.50.87:8000/media");
      setMediaItems(response.data);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenVideo = (url) => {
    setVideoUrl(url);
    setOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenVideo(false);
    setVideoUrl("");
  };

  const handleUploadOpen = () => {
    setOpenUpload(true);
  };

  const handleUploadClose = () => {
    setOpenUpload(false);
    setUploading(false);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("sname", sname);
    formData.append("title", title);
    formData.append("imgsrc", imgsrc);
    formData.append("video", video);

    try {
      await axios.post("http://192.168.50.87:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Upload successful");
      setOpenUpload(false);
      fetchMedia();
    } catch (error) {
      console.error("Error uploading media:", error);
    } finally {
      setUploading(false);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedItems = mediaItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ padding: 2, marginTop: "80px" }}>
      <Typography variant="h4" textAlign="center" color="white">
        Best Netflix Series
      </Typography>

      <Grid container spacing={3} padding={2}>
        {selectedItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            lg={3}
            key={item._id}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                maxWidth: "300px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                margin: "10px",
                backgroundColor: "white",
              }}
            >
              <CardMedia
                component="img"
                image={item.imgsrc}
                alt={item.sname}
                sx={{ aspectRatio: "3.3 / 4", width: "100%", height: "auto" }}
              />
              <CardContent sx={{ padding: "16px", textAlign: "center" }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: "14px" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontSize: "18px", margin: "10px 0" }}
                >
                  {item.sname}
                </Typography>
              </CardContent>
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="small"
                  sx={{
                    padding: "8px 16px",
                    backgroundColor: "#e50914",
                    color: "white",
                    "&:hover": { backgroundColor: "#cc0000" },
                  }}
                  onClick={() => handleOpenVideo(item.videoUrl || item.link)}
                >
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Pagination
          count={Math.ceil(mediaItems.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Box display="flex" justifyContent="center" margin={2}>
        <Button
          variant="contained"
          onClick={handleUploadOpen}
          sx={{
            padding: "10px 20px",
            backgroundColor: "#e50914",
            "&:hover": { backgroundColor: "#cc0000" },
            fontWeight: "bold",
          }}
        >
          Upload New Series
        </Button>
      </Box>

      <Dialog open={openVideo} onClose={handleCloseVideo} maxWidth="md" fullWidth>
        <Box sx={{ padding: "16px" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseVideo}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Box sx={{ paddingTop: "56.25%", position: "relative" }}>
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                playing={true}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </Box>
          </DialogContent>
        </Box>
      </Dialog>

      <Dialog open={openUpload} onClose={handleUploadClose} maxWidth="sm" fullWidth>
        <Box sx={{ padding: 4 }}>
          <Typography variant="h5" textAlign="center" sx={{ marginBottom: 2 }}>
            Upload New Series
          </Typography>
          <form onSubmit={handleUploadSubmit}>
            <TextField
              fullWidth
              label="Series Name"
              variant="outlined"
              value={sname}
              onChange={(e) => setSname(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={imgsrc}
              onChange={(e) => setImgsrc(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ width: "100%", marginBottom: 2 }}
            >
              Choose File
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files[0])}
                hidden
              />
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ padding: "12px 16px", backgroundColor: "#1e88e5" }}
              disabled={uploading}
            >
              {uploading ? <CircularProgress size={24} color="inherit" /> : "Upload"}
            </Button>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CardsComponent;
