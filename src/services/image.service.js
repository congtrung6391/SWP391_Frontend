import axios from "axios";

class ImageService {
  static uploadImage = async (image) => {
    const form = new FormData();
    form.append('image', image);
    console.log(image);
    const response = await axios({
      method: 'post',
      url: '	https://api.imgur.com/3/upload',
      headers: {
        'Authorization': 'Client-ID db4e3952d43c6bb',
        'Content-Type': 'multipart/form-data',
      },
      data: form,
    })
    console.log(response);
  }
}

export default ImageService;