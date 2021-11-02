import axios from "axios";

class ImageService {
  static uploadImage = async (image) => {
    const form = new FormData();
    form.append('image', image);
    try {
      const response = await axios({
        method: 'post',
        url: '	https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID db4e3952d43c6bb',
          'Content-Type': 'multipart/form-data',
        },
        data: form,
      })
      return response.data.data.link;
    } catch (err) {
      // return err.message;
      return 'https://i.imgur.com/iYu5zig.png';
    }
  }
}

export default ImageService;