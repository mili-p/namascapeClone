export const editorConfiguration = {
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                className: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                className: 'ck-heading_heading1',
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                className: 'ck-heading_heading2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                className: 'ck-heading_heading3'
            },
            {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                className: 'ck-heading_heading4'
            },
            {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                className: 'ck-heading_heading5'
            },
            {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                className: 'ck-heading_heading6'
            }
        ]
    },
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            //  'imageUpload',
            //  '|',
            'alignment:left',
            'alignment:right',
            'alignment:center',
            'alignment:justify',
            '|',
            'insertTable',
            'undo',
            'redo',
            'highlight:yellowMarker',
            'highlight:greenMarker',
            'highlight:pinkMarker',
            'highlight:greenPen',
            'highlight:redPen',
            'removeHighlight'
        ]
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:alignLeft',
            'imageStyle:full',
            'imageStyle:alignRight'
        ],
        resizeUnit: '%',
        styles: ['full', 'alignLeft', 'alignRight']
    },
    alignment: {
        options: ['left', 'right', 'center', 'justify']
    },
    table: {
        tableProperties: {
            defaultProperties: {
                borderStyle: 'dashed',
                borderColor: 'hsl(90, 75%, 60%)',
                borderWidth: '3px',
                alignment: 'left',
                width: '550px',
                height: '450px'
            },
            tableCellProperties: {
                defaultProperties: {
                    horizontalAlignment: 'center',
                    verticalAlignment: 'bottom',
                    padding: '10px'
                }
            }
        }
    },
    highlight: {
        options: [
            {
                model: 'redPen',
                class: 'pen-red',
                title: 'Red pen',
                color: 'var(--ck-highlight-pen-red)',
                type: 'pen'
            },
            {
                model: 'greenPen',
                class: 'pen-green',
                title: 'Green pen',
                color: 'var(--ck-highlight-pen-green)',
                type: 'pen'
            },
            {
                model: 'yellowMarker',
                class: 'marker-yellow',
                title: 'Yellow marker',
                color: 'var(--ck-highlight-marker-yellow)',
                type: 'marker'
            },
            {
                model: 'greenMarker',
                class: 'marker-green',
                title: 'Green marker',
                color: 'var(--ck-highlight-marker-green)',
                type: 'marker'
            },
            {
                model: 'pinkMarker',
                class: 'marker-pink',
                title: 'Pink marker',
                color: 'var(--ck-highlight-marker-pink)',
                type: 'marker'
            },
            {
                model: 'blueMarker',
                class: 'marker-blue',
                title: 'Blue marker',
                color: 'var(--ck-highlight-marker-blue)',
                type: 'marker'
            }
        ]
    }
}
