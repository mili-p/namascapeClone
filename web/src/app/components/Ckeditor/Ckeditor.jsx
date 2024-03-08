import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { Controller } from "react-hook-form";
import {editorConfiguration} from '@/utils/CKEditorConfig/EditorConfiguration'

const Ckeditor = ({control,name="emailBodyEditor"}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <CKEditor
          data={value}
          removePlugins="ckeditor_logo"
          editor={ClassicEditor}
          config={editorConfiguration}
          onReady={(editor) =>
            // ckeditordata?.description
            console.log(editor.getData(), "hello")
          }
          onChange={(event, editor) => {
            // console.log(editor.getData(), "EDITOR");
            onChange(editor.getData());
          }}
          // onChange={handleCKEditor}
        />
      )}
    />
  );
};

export default Ckeditor;
