import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  asynccmsUpdateThunk,
  asynccmsViewThunk,
} from "../../redux/thunk/cmsThunk/cms.thunk";

import {editorConfiguration} from '../../common/EditorConfiguration'
import LoaderBtn from "../../components/common/LoaderBtn";
import PageLoader from '../../components/PageLoader'

const TermsAndCondition = () => {
  const dispatch = useDispatch();
  
  const { cms, isLoading } = useSelector((e) => e?.cms);

  
  useEffect(() => {
    dispatch(asynccmsViewThunk({ slug: "terms-and-conditions" }));
  }, []);
  
  const [data, setData] = useState(null)
  const [data2, setData2] = useState(null)
  
  return (
      <div className="privacy-policy-page account-common-details">
          <div className="account-title flex items-center justify-between flex-wrap">
              <h2>Terms And Conditions</h2>
          </div>
          <div className="ck-editor-wrap">

              <div className="input-group">
                <label>Terms And Conditions in English</label>
                  <CKEditor
                      data={cms?.data?.description}
                      editor={ ClassicEditor }
                      config={editorConfiguration}
                      onReady={(editor) => {}}

                      onChange={(event, editor) => {
                          const data = editor.getData()
                          setData(data)
                      }}
                      onBlur={(event, editor) => {}}
                      onFocus={(event, editor) => {}}
                  /> 
              </div>

              <div className="input-group">
                <label>Terms And Conditions in German</label>

                  <CKEditor
                      data={cms?.data?.descriptionDe}
                      editor={ ClassicEditor }
                      config={editorConfiguration}
                      onReady={(editor) => {}}

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
                              slug: 'terms-and-conditions',
                              description: data,
                              descriptionDe:data2
                          })
                      )
                  }
              >
                {isLoading ? <LoaderBtn /> :"Save"}
              </button>
          </div>
      </div>
  )
};

export default TermsAndCondition;
