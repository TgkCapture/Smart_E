import React from "react";
import { useStateContext } from "@/context";
import { checkIfImage } from "@/utils";
import axios from "axios";


const categories = ["Housing", "Rental", "Farmhouse", "Office", "Commercial", "Country",];

const CreateOne = () => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [properties, setProperties] = useState([]);
    // const [file, setFile] = useState(null);
    // const [showImg, setShowImg] = useState(null);
    // const [fileName, setFileName] = useState();

    const { address, contract, connect, createPropertyFunction } = useStateContext();

    // const [form, setForm] = useState({
    //     propertyTitle: "",
    //     description: "",
    //     category: "",
    //     price: "",
    //     images: "",
    //     propertyAddress: "",
    // });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value });
      };
    
      const handleSubmit = async () => {
        checkIfImage(form.images, async (exists) => {
          if (exists) {
            setIsLoading(true);
            await createPropertyFunction({
              ...form,
              price: ethers.utils.parseUnits(form.price, 18),
            });
            setIsLoading(false);
          } else {
            alert("Provide valid image URL");
            setForm({ ...form, images: "" });
          }
        });
      };

      const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setFile(URL.createObjectURL(event.target.files[0]));
        }
      };

       //UPLOAD TO PINATA
//   const handleUpload = async () => {
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `06c3090c13c5847af87b`,
//             pinata_secret_api_key: `
//             a17317bb60c20e6e59326c85ebd933a9cdb1ae69c03ced4ff2eb42c51af73679`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

//         setFileName(ImgHash);
//         console.log(ImgHash);

//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (error) {
//         alert("Unable to upload image to Pinata", error);
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };

    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
        setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };





    return (
        <section>
            <div className="create-content">
                <div className="create-content-heading">
                    <div className="create-content-title">
                        <p>Create Property</p>
                    </div>
                    <div className="create-content-title">
                        <p>Home / <span>Create Property</span></p>
                    </div>
                </div>
                <div className="create-content-content">
                    <div className="create-pane">
                        <div className="create-pane-section">
                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Property Title</p>
                                </div>
                                <div className="create-box-input">
                                    <input type="text" name="title" id="title" placeholder="Title" onChange={(e) => handleFormFieldChange("propertyTitle", e)} required />
                                </div>
                            </div>
                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Image Url</p>
                                </div>
                                <div className="create-box-input">
                                    <input type="url" name="url" id="url" placeholder="Url" onChange={(e) => handleFormFieldChange("images", e)} />
                                </div>
                            </div>

                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Price</p>
                                </div>
                                <div className="create-box-input">
                                    <input type="Number" name="price" id="price" onChange={(e) => handleFormFieldChange("price", e)}/>
                                </div>
                            </div>
                        </div>
                        <div className="create-pane-section">
                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Property Address</p>
                                </div>
                                <div className="create-box-input">
                                    <input type="text" name="address" id="address" placeholder="Physical Address" onChange={(e) => handleFormFieldChange("PropertyAddress", e)}/>
                                </div>
                            </div>
                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Category</p>
                                </div>
                                <div className="create-box-input">
                                    <select name="" id="">
                                        <option value="">Housing</option>
                                        <option value="">FarmHouse</option>
                                        <option value="">Commercial</option>
                                        <option value="">Office</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="create-pane-section">
                            <div className="create-box">
                                <div className="create-box-name">
                                    <p>Description</p>
                                </div>
                                <div className="create-box-input">
                                    <textarea name="" id="" cols="30" rows="10" placeholder="Description" onChange={(e) => handleFormFieldChange("description", e)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="create-pane-button">
                            <button>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default CreateOne;




        {/* <section>
            <div classNameName="content">
                <div classNameName="content-heading">
                    <div classNameName="content-title">
                        <h2>Add Property</h2>
                    </div>
                </div>
            </div>

            <div classNameName="content-content">
                
            </div>

        </section> */}