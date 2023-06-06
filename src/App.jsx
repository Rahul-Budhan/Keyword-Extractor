

import { Container, Box } from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";
import TextInput from "./components/TextInput";
import { useState } from "react";
import KeywordsModal from "./components/KeywordsModal";

const  App = () => {
  const [keywords, setKeywords] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: 'Extract Keywords from this text. Make the first letter of each word uppercase and seperate with commas\n\n'+ text + '',
        temperature: 0.6,
        max_tokens: 60,
        frequency_penalty: 0.8
      })
    };
    console.log(options)
    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);
    console.log(response)
    const json = await response.json();
    console.log(json)
    const data = json.choices[0].text.trim();

    console.log(data);
    setKeywords(data);
    setLoading(false);
  }

  const closeModal = () =>{
    setIsOpen(false);
  }
  return (
    <>
      <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
        <Container maxW={'3xl'} centerContent>
          <Header />
          <TextInput extractKeywords={extractKeywords} />
          <Footer />
        </Container>
        <KeywordsModal keywords={keywords} loading ={ loading} isOpen={isOpen} closeModal={closeModal}/>
      </Box>
    </>
  );
};

export default App;