import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";

const Input = styled("input")({
  display: "none",
});

export default function UploadButtons({ handleFileUpload }) {
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <label htmlFor='contained-button-file'>
        <Input
          accept='.csv,.xlsx,.xls'
          id='contained-button-file'
          type='file'
          onChange={handleFileUpload}
        />
        <Button variant='contained' component='span'>
          Upload Units
        </Button>
      </label>
    </Stack>
  );
}
