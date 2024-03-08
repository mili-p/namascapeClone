import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  asynccmsUpdateThunk,
  asynccmsViewThunk,
} from "../../redux/thunk/cmsThunk/cms.thunk";
import {editorConfiguration} from '../../common/EditorConfiguration'
import LoaderBtn from '../../components/common/LoaderBtn'

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  
  const { cms, isLoading } = useSelector((e) => e?.cms);

  
  useEffect(() => {
    dispatch(asynccmsViewThunk({ slug: "privacy-policy" }));
  }, []);
  
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)

  return (
      <div className="privacy-policy-page account-common-details">
          <div className="account-title flex items-center justify-between flex-wrap">
              <h2>Privacy policy</h2>
          </div>
          <div className="ck-editor-wrap">
              <span>Privacy Poclicy in English</span>
              <div className="ck-editor-box">
                  <CKEditor
                      data={cms?.data?.description}
                      removePlugins="ckeditor_logo"
                      editor={ ClassicEditor }
                      config={editorConfiguration}
                      onReady={(editor) => {editor.focus()}}

                      onChange={(event, editor) => {
                          const data = editor.getData()
                           setData(data)
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                  />
              </div>

              <div className="ck-editor-box">
              <span>Privacy Poclicy in German</span>
                  <CKEditor
                      data={cms?.data?.descriptionDe}
                      removePlugins="ckeditor_logo"
                      editor={ ClassicEditor }
                      config={editorConfiguration}
                      onReady={(editor) => {editor.focus()}}

                      onChange={(event, editor) => {
                          const data = editor.getData()
                           setData2(data)
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                  />
              </div>
              
              <button
                  type="button"
                  className="solid-btn dashboard-form-btn"
                  onClick={() =>
                      dispatch(
                          asynccmsUpdateThunk({
                             cmsId: cms?.data?.cmsId,
                              slug: 'privacy-policy',
                              description: data,
                              descriptionDe: data2,
                          })
                      )
                  }
              >
                {isLoading ? <LoaderBtn /> : "Save"}
              </button>
          </div>
      </div>
  )
};

export default PrivacyPolicy;
