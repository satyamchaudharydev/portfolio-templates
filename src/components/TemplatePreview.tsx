"use client";

export const TemplatePreview = ({src}: {src: string}) => {
    return (
        <iframe 
          srcDoc={src} 
          className="w-full h-full" 
          title="Portfolio Preview"
          style={{
            background: "#fff"
          }}
        />
    )    
}