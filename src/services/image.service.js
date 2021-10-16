import axios from "axios";

class ImageService {
  static uploadImage = async (image) => {
    const form = new FormData();
    form.append('image', image);
    console.log(image);
    const response = await axios({
      method: 'post',
      url: '	https://api.imgur.com/3/image',
      headers: {
        'Authorization': 'Client-ID db4e3952d43c6bb',
        'Content-Type': 'multipart/form-data',
      },
      data: form,
    })
    // return 'https://i.imgur.com/iYu5zig.png';
    return response.data.link;
  }
}

export default ImageService;