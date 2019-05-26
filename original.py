# Recursively scans a folder (psdRoot) for Photoshop PSD files.
# For each, exports various 24-bit PNG textures based on layer
# groups found in the PSD.
# Requires the Win32 Extensions:
# http://python.net/crew/mhammond/win32/
 
import win32com.client
import os
 
# Change to match your root folder
psdRoot = r'C:\test'
 
# Map of layer group names and the suffixes to use when exporting
exportTypes = {'diffuse':'_D', 'normal':'_N', 'specular':'_S'}
 
if (__name__ == '__main__'):
   # COM dispatch for Photoshop
   psApp = win32com.client.Dispatch('Photoshop.Application')
 
   # Photoshop actually exposes several different COM interfaces,
   # including one specifically for classes defining export options.
   options = win32com.client.Dispatch('Photoshop.ExportOptionsSaveForWeb')
   options.Format = 13   # PNG
   options.PNG8 = False  # Sets it to PNG-24 bit
 
   # Get all PSDs under root dir
   psdFiles = []
 
   for root, dir, files in os.walk(psdRoot):
      for thisFile in files:
         if (thisFile.lower().endswith('.psd')):
            fullFilename = os.path.join(root, thisFile)
            psdFiles.append(fullFilename)
 
   # Loop through PSDs we found
   for psdFile in psdFiles:
      doc = psApp.Open(psdFile)
      layerSets = doc.LayerSets
 
      if (len(layerSets) > 0):
         # First hide all root-level layers
         for layer in doc.Layers:
            layer.Visible = False
         # ... and layerSets
         for layerSet in layerSets:
            layerSet.Visible = False
            
         # Loop through each LayerSet (aka Group)
         for layerSet in layerSets:
            lsName = layerSet.Name.lower()
 
            if (lsName in exportTypes):
               layerSet.Visible = True  # make visible again
 
               # Make our export filename
               pngFile = os.path.splitext(psdFile)[0] + exportTypes[lsName] + '.png'
 
               # If PNG exists but older than PSD, delete it.
               if (os.path.exists(pngFile)):
                  psdTime = os.stat(psdFile)[8]
                  pngTime = os.stat(pngFile)[8]
         
                  if (psdTime > pngTime):
                     os.remove(pngFile)
 
               # Export PNG for this layer Group
               if (not os.path.exists(pngFile)):
                  doc = psApp.Open(psdFile)
                  doc.Export(ExportIn=pngFile, ExportAs=2, Options=options)
                  print 'exporting:', pngFile
               else:
                  print 'skipping newer file:', psdFile
                  
               # Make LayerSet invisible again
               layerSet.Visible = False
 
         # Close PSD without saving
         doc.Close(2)