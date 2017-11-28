<?php
/**
 * Constants
 *
 * $Id: Constants.php 2643 2013-02-22 00:28:59Z liuar $
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

///////////////////////////////////////////////////////////////////////////////
/// Mime types for data to be sent to clients.
class MgMimeType
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /// application/agf
   const Agf  = "application/agf"; /// \if INTERNAL  \endif 
   /// application/octet-stream
   const Binary  = "application/octet-stream"; /// \if INTERNAL  \endif 
   /// model/vnd.dwf
   const Dwf  = "model/vnd.dwf"; /// \if INTERNAL  \endif 
   /// image/gif
   const Gif  = "image/gif"; /// \if INTERNAL  \endif 
   /// image/jpeg
   const Jpeg  = "image/jpeg"; /// \if INTERNAL  \endif 
   /// image/png
   const Png  = "image/png"; /// \if INTERNAL  \endif 
   /// text/plain
   const Text  = "text/plain"; /// \if INTERNAL  \endif 
   /// image/tiff
   const Tiff  = "image/tiff"; /// \if INTERNAL  \endif 
   /// text/xml
   const Xml  = "text/xml"; /// \if INTERNAL  \endif 
   /// text/html
   const Html  = "text/html"; /// \if INTERNAL  \endif 
   /// application/vnd.google-earth.kml+xml
   const Kml  = "application/vnd.google-earth.kml+xml"; /// \if INTERNAL  \endif 
   /// application/vnd.google-earth.kmz
   const Kmz  = "application/vnd.google-earth.kmz"; /// \if INTERNAL  \endif 
   
}

/// \defgroup MgPropertyType MgPropertyType
/// \ingroup Feature_Properties_Module
/// \{
////////////////////////////////////////////////////////////
/// \brief
/// Defines the names for the various property types.
///
/// \remarks
/// All of the property types are data property types except
/// Feature, Geometry, Null, and Raster.
///
class MgPropertyType
{
   ///////////////////////////////////////////////////
   /// \brief
   /// Type name for a null property.
   ///
   /// \remarks
   /// This property type name is not currently used.
   const Null = 0 ; 
   /////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a boolean property (MgBooleanProperty).
   const Boolean = 1 ; 
   ////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a byte (unsigned 8 bit value) property
   /// (MgByteProperty).
   const Byte = 2 ; 
   //////////////////////////////////////////////////////////////
   /// \brief
   /// Type name for an MgDateTime property (MgDateTimeProperty).
   const DateTime = 3 ; 
   /////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a single precision floating point value
   /// property (MgSingleProperty).
   const Single = 4 ; 
   /////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a double precision floating point value
   /// property (MgDoubleProperty).
   const Double = 5 ; 
   ////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a 16 bit signed integer value property
   /// (MgInt16Property).
   const Int16 = 6 ; 
   ////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a 32 bit signed integer value property
   /// (MgInt32Property).
   const Int32 = 7 ; 
   ////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a 64 bit signed integer value property
   /// (MgInt64Property).
   const Int64 = 8 ; 
   ///////////////////////////////////////////////////////
   /// \brief
   /// Type name for a string property (MgStringProperty).
   const String = 9 ; 
   ////////////////////////////////////////////////
   /// \brief
   /// Type name for a Binary Large OBject property
   /// (MgBlobProperty).
   const Blob = 10 ; 
   ///////////////////////////////////////////////////
   /// \brief
   /// Type name for a Character Large OBject property
   /// (MgClobProperty).
   const Clob = 11 ; 
   /////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a feature property (MgFeatureProperty).
   const Feature = 12 ; 
   ///////////////////////////////////////////////////////////
   /// \brief
   /// Type name for a geometry property (MgGeometryProperty).
   const Geometry = 13 ; 
   ///////////////////////////////////////////////////////
   /// \brief
   /// Type name for a raster property (MgRasterProperty).
   const Raster = 14 ; 
   
}

/// \defgroup MgFeaturePropertyType MgFeaturePropertyType
/// \ingroup Feature_Properties_Module
/// \{
///////////////////////////////////////////////////////////
/// \brief
/// Defines names for the different types of property
/// definitions. See MgPropertyDefinition::GetPropertyType.
///
class MgFeaturePropertyType
{
   /////////////////////////////////////////////////
   /// \brief
   /// Type name for a data property definition. See
   /// MgDataPropertyDefinition.
   const DataProperty = 100 ; 
   ////////////////////////////////////////////////////
   /// \brief
   /// Type name for an object property definition. See
   /// MgObjectPropertyDefinition.
   const ObjectProperty = 101 ; 
   //////////////////////////////////////////////////////
   /// \brief
   /// Type name for a geometric property definition. See
   /// MgGeometricPropertyDefinition.
   const GeometricProperty = 102 ; 
   ///////////////////////////////////////////////////////////
   /// \brief
   /// Type name for an association property definition.
   ///
   /// \remarks
   /// Currently there is no class for an association property
   /// definition.
   const AssociationProperty = 103 ; 
   ///////////////////////////////////////////////////
   /// Type name for a raster property definition. See
   /// MgRasterPropertyDefinition.
   const RasterProperty = 104 ; 
   
}

/// \defgroup MgServiceType MgServiceType
/// \ingroup Common_Module
/// \{
//////////////////////////////////////////////////////////////////////////////
/// \brief
/// Service types for Platform services.
class MgServiceType
{
   ////////////////////////////////////////////////////////////////
   /// Resource Service
   const ResourceService = 0 ; 
   ////////////////////////////////////////////////////////////////
   /// DWF Drawing Service
   const DrawingService = 1 ; 
   ////////////////////////////////////////////////////////////////
   /// FDO Feature Service
   const FeatureService = 2 ; 
   ////////////////////////////////////////////////////////////////
   /// Mapping Service
   const MappingService = 3 ; 
   ////////////////////////////////////////////////////////////////
   /// Rendering Service
   const RenderingService = 4 ; 
   ////////////////////////////////////////////////////////////////
   /// Tile Service
   const TileService = 5 ; 
   ////////////////////////////////////////////////////////////////
   /// Kml Service
   const KmlService = 6 ; 
   
}

/// \endcond
///////////////////////////////////////////////////////////////////////////////
/// \cond INTERNAL
/// \brief
/// MapGuide users.
///
class MgUser
{
   /// Site Administrator (Built-in account for administering the site)
   const Administrator  = "Administrator"; 
   /// Anonymous User (Built-in account for guests with Viewer roles)
   const Anonymous  = "Anonymous"; 
   /// Map Author (Built-in account for users with Author roles)
   const Author  = "Author"; 
   /// WFS User (Built-in account for WFS users with Viewer roles)
   const WfsUser  = "WfsUser"; 
   /// WMS User (Built-in account for WMS users with Viewer roles)
   const WmsUser  = "WmsUser"; 
   
}

/// \endcond
///////////////////////////////////////////////////////////////////////////////
/// \cond INTERNAL
/// \brief
/// MapGuide groups.
///
class MgGroup
{
   /// Everyone group (Built-in group to include all users)
   const Everyone  = "Everyone"; 
   
}

/// \endcond
///////////////////////////////////////////////////////////////////////////////
/// \cond INTERNAL
/// \brief
/// MapGuide roles.
///
class MgRole
{
   /// Administrator role (with read/write permission to resources by default)
   const Administrator  = "Administrator"; 
   /// Author role (with read/write permission to resources by default)
   const Author  = "Author"; 
   /// Viewer role (with read-only permission to resources by default)
   const Viewer  = "Viewer"; 
   
}

/// \endcond
///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Defines names for the different types of repositories.
/// \see
/// MgResourceIdentifier::SetRepositoryType
/// \see
/// MgResourceIdentifier::GetRepositoryType
///
/// \ingroup Resource_Service_classes
///
class MgRepositoryType
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   ////////////////////////////////////////////////////////////////
   /// The repository is the \link library library \endlink.
   const Library  = "Library"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// The repository is a \link session_repository session repository \endlink,
   /// used to store temporary data.
   const Session  = "Session"; /// \if INTERNAL  \endif 
   
}

///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Defines names for the different types of resources.
/// \see
/// MgResourceIdentifier::GetResourceType
/// \see
/// MgResourceIdentifier::SetResourceType
///
/// \ingroup Resource_Service_classes
///
class MgResourceType
{
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is the runtime definition of a map.
   ///
   /// \remarks
   /// It is stored in the session repository to represent the
   /// currently visible layers and viewed extents of a map. It is
   /// constructed using a \link MgResourceType::MapDefinition MapDefinition \endlink
   /// (created by a tool such as  Autodesk Studio)
   /// and may contain additional layers which have been added "on
   /// the fly" by a web application. See \link Mapping_Service_Module Mapping Service \endlink
   /// for more details.
   ///
   const Map  = "Map"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a map definition.
   ///
   /// \remarks
   /// It represents an authored map and contains references to a \link MgResourceType::MapDefinition LayerDefinition \endlink
   /// for each layer comprising the map.
   ///
   /// \note
   /// This is different from a \link MgResourceType::Map Map \endlink
   /// resource, which records the current state of a map as it is
   /// being viewed by an end user.
   ///
   const MapDefinition  = "MapDefinition"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a layer definition.
   ///
   /// \remarks
   /// It represents the stylization for a specific map layer. It
   /// may also reference \link drawing_source DrawingSources \endlink and \link feature_source FeatureSources \endlink
   /// depending on the source of the data.
   ///
   const LayerDefinition  = "LayerDefinition"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a \link drawing_source drawing source \endlink.
   ///
   /// \remarks
   /// The resource contains information required by MapGuide
   /// to access data contained in a DWF.
   ///
   const DrawingSource  = "DrawingSource"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a \link feature_source feature source \endlink.
   ///
   /// \remarks
   /// Feature sources access data through FDO data providers like
   /// the Oracle FDO provider or the SDF FDO provider. The resource
   /// contains information required by MapGuide to access the
   /// data.
   ///
   const FeatureSource  = "FeatureSource"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a folder.
   ///
   /// \remarks
   /// Folders in a repository operate in a similar manner to file
   /// system folders. They contain other resources and can be
   /// nested to create resource trees.
   ///
   const Folder  = "Folder"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a load procedure definition.
   ///
   /// \remarks
   /// It records how to load specific data.
   ///
   const LoadProcedure  = "LoadProcedure"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a print layout.
   ///
   /// \remarks
   /// A print layout defines how a map is printed. It sets the size
   /// and resolution of the map on paper and also determines the
   /// location of direction arrows, legends, and other features.
   ///
   const PrintLayout  = "PrintLayout"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is the runtime definition of a selection.
   ///
   /// \remarks
   /// It is stored in the session repository to represent the
   /// current selection on a map.
   ///
   const Selection  = "Selection"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a symbol definition.
   ///
   /// \remarks
   /// It represents the stylization for a specific symbol.
   ///
   const SymbolDefinition  = "SymbolDefinition"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource is a library of symbols.
   ///
   /// \remarks
   /// Tools such as Autodesk Studio can create symbol libraries from a number of sources.
   /// These symbols can then be placed on a map to represent points
   /// of interest. Symbol libraries are referenced from \link MgResourceType::LayerDefinition LayerDefinitions \endlink.
   ///
   const SymbolLibrary  = "SymbolLibrary"; /// \if INTERNAL v \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// This resource represents the screen layout for a specific
   /// map.
   ///
   /// \remarks
   /// Web layouts determine the location and content of toolbars,
   /// the viewed map area, the legend, and viewed items.
   /// \n
   /// You can create web layouts through tools such as Autodesk Studio.
   ///
   const WebLayout  = "WebLayout"; /// \if INTERNAL  \endif 
   
}

///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Substitution tags used within the XML file for a resource.
///
/// \remarks
/// These tags are replaced by the resource service during
/// processing. This enables the resource service to manage the
/// storage of \link resource_data resource data \endlink.
/// For more information, see the <i>MapGuide Developer's Guide</i>.
///
/// \todo
/// [[Add examples for all these. ]]
///
/// \ingroup Resource_Service_classes
///
class MgResourceTag
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   ///////////////////////////////////////////////////////////
   /// \brief
   /// Replaced with the name of the currently logged in user.
   ///
   const LoginUsername  = "%MG_LOGIN_USERNAME%"; /// \if INTERNAL  \endif 
   ///////////////////////////////////////////////////////////////
   /// \brief
   /// Replaced with the password of the currently logged in user.
   ///
   const LoginPassword  = "%MG_LOGIN_PASSWORD%"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////
   /// \brief
   /// Replaced with the default resource-specific username.
   ///
   const Username  = "%MG_USERNAME%"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Replaced with the default resource-specific password.
   ///
   const Password  = "%MG_PASSWORD%"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Replaced with the location of data files associated with the
   /// given resource. The trailing "/" is included.
   ///
   const DataFilePath  = "%MG_DATA_FILE_PATH%"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Denotes beginning of data path alias.
   ///
   const DataPathAliasBegin  = "%MG_DATA_PATH_ALIAS["; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Denotes end of data path alias.
   ///
   const DataPathAliasEnd  = "]%"; /// \if INTERNAL  \endif 
   
}

///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Defines reserved names for resource data.
///
/// \ingroup Resource_Service_classes
///
class MgResourceDataName
{
   /////////////////////////////////////////////////////////////////
   /// \brief
   /// Data name for adding default credentials to a resource.
   ///
   /// \remarks
   /// For an example, see \link MgResourceService::SetResourceData SetResourceData \endlink.
   ///
   const UserCredentials  = "MG_USER_CREDENTIALS"; /// \if INTERNAL  \endif 
   
}

///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Defines the different types of \link resource_data resource data \endlink.
///
/// \remarks
/// For more information, see the <i>MapGuide Developer's Guide</i>.
///
/// \ingroup Resource_Service_classes
///
class MgResourceDataType
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /////////////////////////////////////////////////////////////////
   /// \brief
   /// Resource data stored as a file on disk.
   ///
   /// \remarks
   /// MapGuide creates a separate directory for each resource
   /// and stores all resource data files in that directory. The
   /// directory name can be dynamically substituted into the XML
   /// resource content using \link MgResourceTag::DataFilePath DataFilePath \endlink.
   /// \n
   /// Large files can be uploaded using \link MgResourceService::ApplyResourcePackage ApplyResourcePackage \endlink.
   /// Web server limitations (timeouts, post message sizes, etc.)
   /// will typically limit direct HTTP uploads of file resources to
   /// a few megabytes.
   ///
   const File  = "File"; /// \if INTERNAL  \endif 
   /////////////////////////////////////////////////////////////////
   /// \brief
   /// Stream resource data is stored as a binary stream in the
   /// repository database.
   ///
   /// \remarks
   /// Streams provide quick access to smaller data sets like symbol
   /// libraries. They are not intended for data streams larger than
   /// a few megabytes. Large data sets should be stored as files.
   ///
   const Stream  = "Stream"; /// \if INTERNAL  \endif 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Resource data is stored as a string.
   ///
   /// \remarks
   /// Strings are typically used for small pieces of text, such as
   /// credentials to connect to a database.
   ///
   const String  = "String"; /// \if INTERNAL  \endif 
   
}

/// \endcond
///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Types of resource permissions.
///
/// \ingroup Resource_Service_classes
///
class MgResourcePermission
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /// No Access permission.
   const NoAccess  = "n"; /// \if INTERNAL  \endif 
   /// Read-Only permission.
   const ReadOnly  = "r"; /// \if INTERNAL  \endif 
   /// Read/Write permission.
   const ReadWrite  = "r,w"; /// \if INTERNAL  \endif 
   
}

/// \defgroup MgPageUnitsType MgPageUnitsType
/// \ingroup Mapping_Service_Module
/// \{
/////////////////////////////////////////////////////////////////
/// \brief
/// Defines page size units for the Mapping Service.
///
/// \todo
///   * [[TO DO: I should change my examples to use this
///     instead of hardcoding the string.]]
///
class MgPageUnitsType
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /// Page units are in inches.
   const Inches  = "in"; /// \if INTERNAL  \endif 
   /// Page units are in millimeters.
   const Millimeters  = "mm"; /// \if INTERNAL  \endif 
   
}

/// \}
/// \defgroup MgCoordinateSpace MgCoordinateSpace
/// \ingroup Mapping_Service_Module
/// \{
///////////////////////////////////////////////////////////////////////////////
/// \brief
/// Specifies the coordinate space for feature geometry returned from QueryFeatures.
/// Can also specify that only non-geometric data should be returned by QueryFeature.
///
class MgCoordinateSpace
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /// \brief
   /// Specifies that geometry properties should not be returned by QueryFeature.
   ///
   const None  = "None"; /// \if INTERNAL  \endif 
   /// \brief
   /// Specifies that geometry properties should be returned by QueryFeature in
   /// the coordinate system space of the map they belong to.
   ///
   const Map  = "Map"; /// \if INTERNAL  \endif 
   /// \brief
   /// Specifies that geometry properties should be returned by QueryFeature in
   /// the coordinate system space of the display in the client.
   ///
   const Display  = "Display"; /// \if INTERNAL  \endif 
   
}

/// \defgroup MgReaderType MgReaderType
/// \ingroup Feature_Service_classes
/// \{
///////////////////////////////////////////////////////////////
/// \brief
/// Type of reader represented by an MgReader
///
/// \remarks
/// Defines the type of a reader whose class is derived from
/// MgReader. The three derived classes are MgDataReader,
/// MgFeatureReader, and MgSqlDataReader. An MgReaderType value
/// is returned by the reader's GetReaderType method.
///
class MgReaderType
{
   /////////////////////////////////////////////////////////
   /// Signifies that the object is of type MgFeatureReader.
   const FeatureReader = 0 ; 
   //////////////////////////////////////////////////////
   /// Signifies that the object is of type MgDataReader.
   const DataReader = 1 ; 
   /////////////////////////////////////////////////////////
   /// Signifies that the object is of type MgSqlDataReader.
   const SqlDataReader = 2 ; 
   
}

/// \defgroup MgOrderingOption MgOrderingOption
/// \ingroup Feature_Service_classes
/// \{
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// \brief
/// Defines a type used to specify the order in which features
/// are returned by MgFeatureService::SelectFeatures. This type
/// is used as an argument to the MgFeatureQueryOptions::SetOrderingFilter.
///
class MgOrderingOption
{
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Signifies that the features are returned in ascending order
   /// relative to the properties specified in the first argument of
   /// MgFeatureQueryOptions::SetOrderingFilter.
   const Ascending = 0 ; 
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Signifies that the features are returned in descending order
   /// relative to the properties specified in the first argument of
   /// MgFeatureQueryOptions::SetOrderingFilter.
   const Descending = 1 ; 
   
}

/// \defgroup MgObjectPropertyType MgObjectPropertyType
/// \ingroup Feature_Schema_Module
/// \{
///////////////////////////////////////////////////////////////
/// \brief
/// Defines the type of an MgObjectPropertionDefinition object
/// property, that is, whether the property ccontains a single
/// feature class object, or an unordered or ordered collection
/// of them.
///
class MgObjectPropertyType
{
   ////////////////////////////////////////////////////////////////
   /// Signifies that the object property contains a single feature
   /// class object.
   const Value = 0 ; 
   //////////////////////////////////////////////////////////////
   /// Signifies that the object property contains more than one
   /// feature class object. The collection of objects is in no
   /// particular order relative to the identity property defined
   /// for the collection. See
   /// MgObjectPropertyDefinition::GetIdentityProperty.
   const Collection = 1 ; 
   /////////////////////////////////////////////////////////////////
   /// Signifies that the object property contains more than one
   /// feature class object in ascending or descending order
   /// relative to the identity property defined for the collection.
   /// See MgObjectPropertyDefinition::GetIdentityProperty.
   const OrderedCollection = 2 ; 
   
}

/// \defgroup MgFeatureSpatialOperations MgFeatureSpatialOperations
/// \ingroup Feature_Service_classes
/// \{
/////////////////////////////////////////////////////////////
/// \brief
/// Is a set of constants used to type spatial operations.
/// \remarks
/// A value from this set of constants is used as an argument
/// incalls to MgFeatureQueryOptions::SetSpatialFilter.
///
class MgFeatureSpatialOperations
{
   //////////////////////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property value spatially \link Contains contains \endlink
   /// the literal geometric value.
   const Contains = 0 ; 
   //////////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property value \link Crosses crosses \endlink
   /// the given geometry.
   const Crosses = 1 ; 
   ///////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property value is \link Disjoint disjoint \endlink
   /// from the given geometry.
   const Disjoint = 2 ; 
   //////////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property value is \link Equals equal \endlink
   /// to the given geometry.
   const Equals = 3 ; 
   ////////////////////////////////////////////////////////////////
   /// Test whether the geometric property \link Intersects intersects \endlink
   /// the given geometry.
   const Intersects = 4 ; 
   //////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property \link Overlaps overlaps \endlink
   /// the given geometry.
   const Overlaps = 5 ; 
   /////////////////////////////////////////////////////////////////
   /// Test whether the geometric property \link Touches touches \endlink the
   /// given geometry.
   const Touches = 6 ; 
   /////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property is \link Within within \endlink
   /// the given geometry.
   const Within = 7 ; 
   //////////////////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property value is \link CoveredBy covered by \endlink
   /// the given geometry.
   const CoveredBy = 8 ; 
   /////////////////////////////////////////////////////////////////////////////
   /// Test whether the geometric property is \link Inside inside \endlink
   /// the given geometry.
   const Inside = 9 ; 
   //////////////////////////////////////////////////////////////////////////////////////////////////////////
   /// Test whether the envelope of the geometric property \link EnvelopeIntersects intersects \endlink
   /// the envelope of the given geometry.
   const EnvelopeIntersects = 10 ; 
   
}

/// \defgroup MgFeatureCommandType MgFeatureCommandType
/// \ingroup Feature_Service_classes
/// \{
/////////////////////////////////////////////////////////
/// \brief
/// Is a set of constants used to specify the type of an
/// MgFeatureCommand object.
///
class MgFeatureCommandType
{
   /////////////////////////////////////////////////////
   /// Specifies the type of an MgInsertFeatures object.
   const InsertFeatures = 0 ; 
   /////////////////////////////////////////////////////
   /// Specifies the type of an MgUpdateFeatures object.
   const UpdateFeatures = 1 ; 
   /////////////////////////////////////////////////////
   /// Specifies the type of an MgDeleteFeatures object.
   const DeleteFeatures = 2 ; 
   /////////////////////////////////////////////////////
   /// Specifies the type of an MgLockFeatures object.
   const LockFeatures = 3 ; 
   /////////////////////////////////////////////////////
   /// Specifies the type of an MgUnlockFeatures object.
   const UnlockFeatures = 4 ; 
   
}

/// \defgroup MgSpatialContextExtentType MgSpatialContextExtentType
/// \ingroup Feature_Service_classes
/// \{
/////////////////////////////////////////////////////////////////
/// \brief
/// The SpatialContextExtentType enumeration defines how the extent of
/// a context should be handled by the provider.
class MgSpatialContextExtentType
{
   /// The spatial extent of the context is static and must be specified
   /// when the context is created.
   const scStatic = 0 ; 
   /// The spatial extent of the context is dynamic and changes as data is
   /// added and removed from the context.
   const scDynamic = 1 ; 
   
}

/// \cond INTERNAL
////////////////////////////////////////////////////////////
/// \brief
/// MgGeometryEntityType defines two integer constants which
/// signify whether an MgGeometricEntity is a geometry or a
/// geometry ciomponent.
///
class MgGeometryEntityType
{
   /////////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometric entity is a geometry component.
   ///
   const GeometryComponent = 0 ; 
   ///////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometric entity is a geometry.
   ///
   const Geometry = 1 ; 
   
}

/// \defgroup MgCoordinateDimension MgCoordinateDimension
/// \ingroup Geometry_Module_classes
/// \{
///////////////////////////////////////////////////////////////
/// \brief
/// MgCoordinateDimension defines a set of integer constants
/// which can be OR'd together to specify the dimensionality of
/// an MgCoordinate instance.
///
class MgCoordinateDimension
{
   /////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate has X and Y ordinates.
   ///
   ///
   const XY = 0 ; 
   /////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate has X, Y, and Z ordinates.
   ///
   ///
   const XYZ = 1 ; 
   /////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate has an M ordinate.
   ///
   ///
   const M = 2 ; 
   
}

/// \cond INTERNAL
///////////////////////////////////////////////////////////////////////////////
/// \brief
/// MgGeometricPathInstructionType defines enumerated values used to specify
/// the instructions contained in a geometric path. See MgGeometricPathIterator
/// for a definition of a geometric path.
class MgGeometricPathInstructionType
{
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Defines the beginning coordinate of a new segment in a geometric
   /// path.
   ///
   const MoveTo = 0 ; 
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Defines a straight line from the last coordinate in the geometric
   /// path to the coordinate included with this instruction.
   ///
   const LineTo = 1 ; 
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Defines a quadratic curve from the last coordinate in the geometric
   /// path using the first coordinate of this instruction as the end point
   /// and the second coordinate as the control point.
   ///
   const QuadTo = 2 ; 
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Defines a line from the current coordinate in the geometric path back
   /// to the last MgGeometricPathInstruction.MoveTo, which is the beginning
   /// of the last segment in the path.
   ///
   const Close = 4 ; 
   
}

/// \defgroup MgGeometryType MgGeometryType
/// \ingroup Geometry_Module_classes
/// \{
////////////////////////////////////////////////////////////////
/// \brief
/// MgGeometryType defines integer constants used to signify the
/// derived type of an MgGeometry instance.
///
class MgGeometryType
{
   ////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a Point.
   ///
   const Point = 1 ; 
   /////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a LineString.
   ///
   const LineString = 2 ; 
   //////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a Polygon.
   ///
   const Polygon = 3 ; 
   /////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a MultiPoint.
   ///
   const MultiPoint = 4 ; 
   //////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a MultiLineString.
   ///
   const MultiLineString = 5 ; 
   ///////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a MultiPolygon.
   ///
   const MultiPolygon = 6 ; 
   //////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a MultiGeometry. In OpenGIS
   /// this is referred to as a GeometryCollection.
   ///
   const MultiGeometry = 7 ; 
   //////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a CurveString.
   ///
   const CurveString = 10 ; 
   ///////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a CurvePolygon.
   ///
   const CurvePolygon = 11 ; 
   //////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the geometry is a MultiLineString.
   ///
   const MultiCurveString = 12 ; 
   //////////////////////////////////////////////
   /// \brief
   /// Specifies the geometry is a MultiPolygon.
   ///
   const MultiCurvePolygon = 13 ; 
   
}

/// \defgroup MgGeometryComponentType MgGeometryComponentType
/// \ingroup Geometry_Module_classes
/// \{
////////////////////////////////////////////////////////////////
/// \brief
/// MgGeometryComponentType defines a set of integer constants
/// used to signify the type of a geometry component instance.
///
/// \remarks
/// A
/// geometry component instance is used in the construction of a
/// geometry.
///
class MgGeometryComponentType
{
   ////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the geometry component is a MgLinearRing.
   ///
   const LinearRing = 129 ; 
   /////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the geometry component is an MgArcSegment.
   ///
   const ArcSegment = 130 ; 
   ////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the geometry component is an MgLinearSegment.
   ///
   const LinearSegment = 131 ; 
   ////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the geometry component is an MgCurveRing.
   ///
   const CurveRing = 132 ; 
   
}

/// \defgroup MgLayerGroupType MgLayerGroupType
/// \ingroup Mapping_Service_Module
/// \{
////////////////////////////////////////////////////////////////
/// \brief
/// MgLayerGroupType defines integer constants used to identify
/// the type of a layer group.
class MgLayerGroupType
{
   ////////////////////////////////////////////
   /// \brief
   /// Specifies that the layer group is a normal layer group.
   ///
   const Normal = 1 ; 
   /////////////////////////////////////////////////
   /// \brief
   /// Specifies that the layer is a base map layer group (i.e.
   /// it contains base map layers).
   ///
   const BaseMap = 2 ; 
   
}

/// \defgroup MgLayerType MgLayerType
/// \ingroup Mapping_Service_Module
/// \{
////////////////////////////////////////////////////////////////
/// \brief
/// MgLayerType defines integer constants used to identify the
/// type of a layer.
class MgLayerType
{
   ////////////////////////////////////////////
   /// \brief
   /// Specifies that the layer is a dynamic layer.
   ///
   const Dynamic = 1 ; 
   /////////////////////////////////////////////////
   /// \brief
   /// Specifies that the layer is a base map layer.
   ///
   const BaseMap = 2 ; 
   
}

/// \defgroup MgFeatureGeometricType MgFeatureGeometricType
/// \ingroup Feature_Service_classes
/// \{
/////////////////////////////////////////////////////////////////
/// \brief
/// Is a set of constants specifying the dimensions of geometries
/// which can be stored in a geometry property.
/// \remarks
/// The constants  can be bit-wise OR'd together. A value of this
/// type is returned by
/// MgGeometricPropertyDefinition::GetGeometryTypes.
///
class MgFeatureGeometricType
{
   /////////////////////////////////////////////////////////////
   /// Represents zero-dimensional geometric primitives, such as
   /// MgPoint.
   const Point = 1 ; 
   ////////////////////////////////////////////////////////////
   /// Represents one-dimensional geometric primitives, such as
   /// MgLineString and MgCurveString.
   const Curve = 2 ; 
   ////////////////////////////////////////////////////////////
   /// Represents two-dimensional geometric primitives, such as
   /// MgPolygon and MgCurvePolygon.
   const Surface = 4 ; 
   //////////////////////////////////////////////////////////////
   /// Represents three-dimensional geometric primitives, such as
   /// Cubes.
   const Solid = 8 ; 
   
}

/// \cond INTERNAL
//////////////////////////////////////////////////////////////////
/// \brief
/// Properties stored in an MgConfiguration object.  Note that the properties are
/// organized into Property Sections.  These sections may be used in the API to
/// set/get groups of configuration properties.
/// INTERNAL_ONLY:
class MgConfigProperties
{
   /// Default configuration filenames
   const DefaultConfigurationFilename  = "webconfig.ini"; 
   const ServerConfigurationFilename  = "serverconfig.ini"; 
   ///////////////////////////////////////////////////////////////////////////
   /// Common Configuration Validation Information Maps
   ///
   /// GENERAL PROPERTIES SECTION ---------------------------------------------------------------------------------------
   /// General server properties
   const GeneralPropertiesSection  = "GeneralProperties"; 
   /// Sets the maximum amount of time (in seconds) for connection idle activity before the socket connection is closed
   const GeneralPropertyConnectionTimeout  = "ConnectionTimeout"; 
   const DefaultGeneralPropertyConnectionTimeout  = 120; 
   /// Sets the time duration (in seconds) between timeout checks
   const GeneralPropertyConnectionTimerInterval  = "ConnectionTimerInterval"; 
   const DefaultGeneralPropertyConnectionTimerInterval  = 60; 
   /// Server's locale
   const GeneralPropertyLocale  = "Locale"; 
   const DefaultGeneralPropertyLocale  = ""; 
   /// Server's default message locale
   const GeneralPropertyDefaultMessageLocale  = "DefaultMessageLocale"; 
   const DefaultGeneralPropertyDefaultMessageLocale  = "en"; 
   /// Server's display name
   const GeneralPropertyDisplayName  = "DisplayName"; 
   const DefaultGeneralPropertyDisplayName  = ""; 
   /// Fdo file path
   const GeneralPropertyFdoPath  = "FdoPath"; 
   const DefaultGeneralPropertyFdoPath  = ""; 
   /// Path of the license server
   const GeneralPropertyLicenseServerPath  = "LicenseServerPath"; 
   const DefaultGeneralPropertyLicenseServerPath  = ""; ///  ; 
   /// Sets the field delimiter in the logs
   const GeneralPropertyLogsDelimiter  = "LogsDelimiter"; 
   const DefaultGeneralPropertyLogsDelimiter  = "\t"; 
   /// Root folder for server's log files
   const GeneralPropertyLogsPath  = "LogsPath"; 
   const DefaultGeneralPropertyLogsPath  = "Logs/"; 
   /// Sets the Machine IP address
   const GeneralPropertyMachineIp  = "MachineIp"; 
   const DefaultGeneralPropertyMachineIp  = "127.0.0.1"; 
   /// Sets the maximum log file size (in kilobytes)
   const GeneralPropertyMaxLogFileSize  = "MaxLogFileSize"; 
   const DefaultGeneralPropertyMaxLogFileSize  = 64; 
   /// Specifies whether the maximum log size restriction is enabled
   const GeneralPropertyMaxLogFileSizeEnabled  = "MaxLogFileSizeEnabled"; 
   const DefaultGeneralPropertyMaxLogFileSizeEnabled  = false; 
   /// Root folder for server's localization resources
   const GeneralPropertyResourcesPath  = "ResourcesPath"; 
   const DefaultGeneralPropertyResourcesPath  = "Resources/"; 
   /// Product serial number
   const GeneralPropertySerialNumber  = "SerialNumber"; 
   const DefaultGeneralPropertySerialNumber  = ""; ///  ; 
   /// Sets the time duration (in seconds) between service registrations
   const GeneralPropertyServiceRegistrationTimerInterval  = "ServiceRegistrationTimerInterval"; 
   const DefaultGeneralPropertyServiceRegistrationTimerInterval  = 60; 
   /// TCP/IP Maximum Transmission Unit
   const GeneralPropertyTcpIpMtu  = "TcpIpMtu"; 
   const DefaultGeneralPropertyTcpIpMtu  = 1460; 
   /// Temporary file path
   const GeneralPropertyTempPath  = "TempPath"; 
   const DefaultGeneralPropertyTempPath  = "Temp/"; 
   /// Document path location for WFS documents
   const GeneralPropertyWfsDocumentPath  = "WfsDocumentPath"; 
   const DefaultGeneralPropertyWfsDocumentPath  = "Wfs/"; 
   /// Document path location for WMS documents
   const GeneralPropertyWmsDocumentPath  = "WmsDocumentPath"; 
   const DefaultGeneralPropertyWmsDocumentPath  = "Wms/"; 
      /// ADMINISTRATIVE CONNECTION PROPERTIES SECTION ---------------------------------------------------------------------
   /// Administrative Connection properties
   const AdministrativeConnectionPropertiesSection  = "AdministrativeConnectionProperties"; 
   /// Administrator's email address
   const AdministrativeConnectionPropertyEmail  = "Email"; 
   const DefaultAdministrativeConnectionPropertyEmail  = ""; 
   /// Maximum number of simultaneous administrative connections
   const AdministrativeConnectionPropertyMaxConnections  = "MaxConnections"; 
   const DefaultAdministrativeConnectionPropertyMaxConnections  = 20; 
   /// Sets the port on which administrative connections are made
   const AdministrativeConnectionPropertyPort  = "Port"; 
   const DefaultAdministrativeConnectionPropertyPort  = 5555; 
   /// Sets the size of the administrative operation queue
   const AdministrativeConnectionPropertyQueueSize  = "QueueSize"; 
   const DefaultAdministrativeConnectionPropertyQueueSize  = 10; 
   /// Sets the number of worker threads available for administrative processing
   const AdministrativeConnectionPropertyThreadPoolSize  = "ThreadPoolSize"; 
   const DefaultAdministrativeConnectionPropertyThreadPoolSize  = 5; 
   /// CLIENT CONNECTION PROPERTIES SECTION -----------------------------------------------------------------------------
   /// Client Connection properties
   const ClientConnectionPropertiesSection  = "ClientConnectionProperties"; 
   /// Maximum number of simultaneous client connections
   const ClientConnectionPropertyMaxConnections  = "MaxConnections"; 
   const DefaultClientConnectionPropertyMaxConnections  = 100; 
   /// Sets the port on which client connections are made
   const ClientConnectionPropertyPort  = "Port"; 
   const DefaultClientConnectionPropertyPort  = 4444; 
   /// Sets the size of the client operation queue
   const ClientConnectionPropertyQueueSize  = "QueueSize"; 
   const DefaultClientConnectionPropertyQueueSize  = 10; 
   /// Sets the number of worker threads available for client processing
   const ClientConnectionPropertyThreadPoolSize  = "ThreadPoolSize"; 
   const DefaultClientConnectionPropertyThreadPoolSize  = 10; 
   /// SITE CONNECTION PROPERTIES SECTION -------------------------------------------------------------------------------
   /// Site Connection properties
   const SiteConnectionPropertiesSection  = "SiteConnectionProperties"; 
   /// Sets the Site Connection IP address
   const SiteConnectionPropertyIpAddress  = "IpAddress"; 
   const DefaultSiteConnectionPropertyIpAddress  = "127.0.0.1"; 
   /// Maximum number of simultaneous site connections
   const SiteConnectionPropertyMaxConnections  = "MaxConnections"; 
   const DefaultSiteConnectionPropertyMaxConnections  = 20; 
   /// Sets the port on which site connections are made
   const SiteConnectionPropertyPort  = "Port"; 
   const DefaultSiteConnectionPropertyPort  = 3333; 
   /// Sets the size of the site operation queue
   const SiteConnectionPropertyQueueSize  = "QueueSize"; 
   const DefaultSiteConnectionPropertyQueueSize  = 10; 
   /// Sets the number of worker threads available for site processing
   const SiteConnectionPropertyThreadPoolSize  = "ThreadPoolSize"; 
   const DefaultSiteConnectionPropertyThreadPoolSize  = 5; 
   /// HOST PROPERTIES SECTION ------------------------------------------------------------------------------------------
   /// Host properties
   const HostPropertiesSection  = "HostProperties"; 
   /// Enables/disables the Drawing Service.  Note that in V1.0 this service is only
   /// available on the Site Server and must be enabled there.
   const HostPropertyDrawingService  = "DrawingService"; 
   const DefaultHostPropertyDrawingService  = false; 
   /// Enables/disables the Feature Service.  Note that in V1.0 this service is only
   /// available on the Site Server and must be enabled there.
   const HostPropertyFeatureService  = "FeatureService"; 
   const DefaultHostPropertyFeatureService  = false; 
   /// Enables/disables the Kml Service.
   const HostPropertyKmlService  = "KmlService"; 
   const DefaultHostPropertyKmlService  = false; 
   /// Enables/disables the Mapping Service
   const HostPropertyMappingService  = "MappingService"; 
   const DefaultHostPropertyMappingService  = false; 
   /// Enables/disables the Rendering Service
   const HostPropertyRenderingService  = "RenderingService"; 
   const DefaultHostPropertyRenderingService  = false; 
   /// Enables/disables the Resource Service.  Note that in V1.0 this service is only
   /// available on the Site Server and must be enabled there.
   const HostPropertyResourceService  = "ResourceService"; 
   const DefaultHostPropertyResourceService  = false; 
      /// Enables/disables the Site Service.  Note that in V1.0 this service is only
   /// available on the Site Server and must be enabled there.
   const HostPropertySiteService  = "SiteService"; 
   const DefaultHostPropertySiteService  = false; 
   /// Enables/disables the Tile Service
   const HostPropertyTileService  = "TileService"; 
   const DefaultHostPropertyTileService  = false; 
   /// DRAWING SERVICE PROPERTIES SECTION -------------------------------------------------------------------------------
   /// Drawing Service properties.  Note that in V1.0 this property section is only defined on the Site Server.
   const DrawingServicePropertiesSection  = "DrawingServiceProperties"; 
   /// FEATURE SERVICE PROPERTIES SECTION -------------------------------------------------------------------------------
   /// Feature Service properties.  Note that in V1.0 this property section is only defined on the Site Server.
   const FeatureServicePropertiesSection  = "FeatureServiceProperties"; 
   /// Sets the maximum number of internal data objects to cache
   const FeatureServicePropertyCacheSize  = "CacheSize"; 
   const DefaultFeatureServicePropertyCacheSize  = 100; 
   /// Sets the maximum amount of time (in seconds) to cache the internal data objects
   const FeatureServicePropertyCacheTimeLimit  = "CacheTimeLimit"; 
   const DefaultFeatureServicePropertyCacheTimeLimit  = 86400; 
   /// Sets the time duration (in seconds) between cache timelimit checks
   const FeatureServicePropertyCacheTimerInterval  = "CacheTimerInterval"; 
   const DefaultFeatureServicePropertyCacheTimerInterval  = 3600; 
   /// Sets the maximum number of features fetched to reduce the network traffic
   const FeatureServicePropertyDataCacheSize  = "DataCacheSize"; 
   const DefaultFeatureServicePropertyDataCacheSize  = 100; 
   /// Sets whether to pool connections
   const FeatureServicePropertyDataConnectionPoolEnabled  = "DataConnectionPoolEnabled"; 
   const DefaultFeatureServicePropertyDataConnectionPoolEnabled  = false; 
   /// Sets the excluded privders from the pooled data connections
   const FeatureServicePropertyDataConnectionPoolExcludedProviders  = "DataConnectionPoolExcludedProviders"; 
   const DefaultFeatureServicePropertyDataConnectionPoolExcludedProviders  = "OSGeo.SDF,OSGeo.SHP"; 
   /// Sets the number of pooled data connections
   const FeatureServicePropertyDataConnectionPoolSize  = "DataConnectionPoolSize"; 
   const DefaultFeatureServicePropertyDataConnectionPoolSize  = 50; 
   /// Sets the number of pooled data connections for a specific provider
   const FeatureServicePropertyDataConnectionPoolSizeCustom  = "DataConnectionPoolSizeCustom"; 
   const DefaultFeatureServicePropertyDataConnectionPoolSizeCustom  = ""; 
   /// Sets the maximum amount of time (in seconds) for data connection idle activity before the data connection is closed
   const FeatureServicePropertyDataConnectionTimeout  = "DataConnectionTimeout"; 
   const DefaultFeatureServicePropertyDataConnectionTimeout  = 600; 
   /// Sets the time duration (in seconds) between timeout checks
   const FeatureServicePropertyDataConnectionTimerInterval  = "DataConnectionTimerInterval"; 
   const DefaultFeatureServicePropertyDataConnectionTimerInterval  = 60; 
   /// Sets the batch size used by the join query algorithm
   const FeatureServicePropertyJoinQueryBatchSize  = "JoinQueryBatchSize"; 
   const DefaultFeatureServicePropertyJoinQueryBatchSize  = 100; 
   /// MAPPING SERVICE PROPERTIES SECTION -------------------------------------------------------------------------------
   /// Mapping Service properties
   const MappingServicePropertiesSection  = "MappingServiceProperties"; 
   /// Sets the font to use when rendering legend elements
   const MappingServicePropertyLegendFont  = "LegendFont"; 
   const DefaultMappingServicePropertyLegendFont  = "Arial"; 
   /// RENDERING SERVICE PROPERTIES SECTION -----------------------------------------------------------------------------
   /// Rendering Service properties
   const RenderingServicePropertiesSection  = "RenderingServiceProperties"; 
   /// Sets the maximum request extent offset to use when requesting features for a tile, specified as a factor of the tile size
   const RenderingServicePropertyTileExtentOffset  = "TileExtentOffset"; 
   const DefaultRenderingServicePropertyTileExtentOffset  = 0.35; 
   /// FONT ALIASES SECTION -----------------------------------------------------------------------------
   /// font alias mappings
   const FontAliasMappingSection  = "FontAliases"; 
   /// unmanaged data mappings
   const UnmanagedDataMappingsSection  = "UnmanagedDataMappings"; 
   /// RESOURCE SERVICE PROPERTIES SECTION ------------------------------------------------------------------------------
   /// Resource Service properties.  Note that in V1.0 this property section is only defined on the Site Server.
   const ResourceServicePropertiesSection  = "ResourceServiceProperties"; 
   /// Sets the root of the library repository
   const ResourceServicePropertyLibraryRepositoryPath  = "LibraryRepositoryPath"; 
   const DefaultResourceServicePropertyLibraryRepositoryPath  = "Repositories/Library/"; 
   /// Sets the root of the library resource data files
   const ResourceServicePropertyLibraryResourceDataFilePath  = "LibraryResourceDataFilePath"; 
   const DefaultResourceServicePropertyLibraryResourceDataFilePath  = "Repositories/Library/DataFiles/"; 
   /// Sets the path to resource packages
   const ResourceServicePropertyPackagesPath  = "PackagesPath"; 
   const DefaultResourceServicePropertyPackagesPath  = "Packages/"; 
   /// Sets the time duration (in seconds) between repository checkpoints
   const ResourceServicePropertyRepositoryCheckpointsTimerInterval  = "RepositoryCheckpointsTimerInterval"; 
   const DefaultResourceServicePropertyRepositoryCheckpointsTimerInterval  = 600; 
   /// Sets the time duration (in seconds) between resource change notifications
   const ResourceServicePropertyResourceChangeTimerInterval  = "ResourceChangeTimerInterval"; 
   const DefaultResourceServicePropertyResourceChangeTimerInterval  = 5; 
   /// Sets the trash folder name
   const ResourceServicePropertyResourceDataFileTrashFolderName  = "ResourceDataFileTrashFolderName"; 
   const DefaultResourceServicePropertyResourceDataFileTrashFolderName  = "Trash"; 
   /// Sets the maximum number of resources with permission information to be cached
   const ResourceServicePropertyResourcePermissionCacheSize  = "ResourcePermissionCacheSize"; 
   const DefaultResourceServicePropertyResourcePermissionCacheSize  = 1000; 
   /// Sets the path to all resource schema files
   const ResourceServicePropertyResourceSchemaFilePath  = "ResourceSchemaFilePath"; 
   const DefaultResourceServicePropertyResourceSchemaFilePath  = "Schema/"; 
      /// Sets the root of the session repository
   const ResourceServicePropertySessionRepositoryPath  = "SessionRepositoryPath"; 
   const DefaultResourceServicePropertySessionRepositoryPath  = "Repositories/Session/"; 
   /// Sets the root of the session resource data files
   const ResourceServicePropertySessionResourceDataFilePath  = "SessionResourceDataFilePath"; 
   const DefaultResourceServicePropertySessionResourceDataFilePath  = "Repositories/Session/DataFiles/"; 
   /// Sets the root of the site repository
   const ResourceServicePropertySiteRepositoryPath  = "SiteRepositoryPath"; 
   const DefaultResourceServicePropertySiteRepositoryPath  = "Repositories/Site/"; 
   /// SITE SERVICE PROPERTIES SECTION ----------------------------------------------------------------------------------
   /// Site Service properties.  Note that in V1.0 this property section is only defined on the Site Server.
   const SiteServicePropertiesSection  = "SiteServiceProperties"; 
   /// Sets the maximum amount of time (in seconds) for session timeout
   const SiteServicePropertySessionTimeout  = "SessionTimeout"; 
   const DefaultSiteServicePropertySessionTimeout  = 1200; 
   /// Sets the time duration (in seconds) between session timeout checks
   const SiteServicePropertySessionTimerInterval  = "SessionTimerInterval"; 
   const DefaultSiteServicePropertySessionTimerInterval  = 400; 
   /// TILE SERVICE PROPERTIES SECTION ----------------------------------------------------------------------------------
   /// Tile Service properties
   const TileServicePropertiesSection  = "TileServiceProperties"; 
   /// Specifies whether the tile is only rendered
   const TileServicePropertyRenderOnly  = "RenderOnly"; 
   const DefaultTileServicePropertyRenderOnly  = false; 
   /// Sets the root of the image tile cache
   const TileServicePropertyTileCachePath  = "TileCachePath"; 
   const DefaultTileServicePropertyTileCachePath  = "Repositories/TileCache/"; 
   const TileServicePropertyTileColumnsPerFolder  = "TileColumnsPerFolder"; 
   const DefaultTileServicePropertyTileColumnsPerFolder  = 30; 
   const TileServicePropertyTileRowsPerFolder  = "TileRowsPerFolder"; 
   const DefaultTileServicePropertyTileRowsPerFolder  = 30; 
   const TileServicePropertyTileSizeX  = "DefaultTileSizeX"; ///  ; 
   const DefaultTileServicePropertyTileSizeX  = 300; ///  ; 
   const TileServicePropertyTileSizeY  = "DefaultTileSizeY"; ///  ; 
   const DefaultTileServicePropertyTileSizeY  = 300; ///  ; 
   const TileServicePropertyImageFormat  = "ImageFormat"; 
   const DefaultTileServicePropertyImageFormat  = "PNG"; 
      //////////////////////////////////////////////////////////////////
   /// \brief
   /// The remaining properties are log properties.  For each type of log, there is a "Parameters" property.
   /// These parameters may be used to customize a log and are listed below.  Note that not
   /// all of the parameters may be used with a particular log.  See the list of valid
   /// parameters for each log type below. The Parameters string is a list of
   /// comma-delimited parameter names.  Each log type has a different set of possible
   /// parameters.
   ///
   /// <table border="1" class="RuledTable">
   ///    <tr>
   ///        <th>Parameter</th>
   ///        <th>Description</th>
   ///    </tr>
   ///    <tr>
   ///        <td>ALL</td>
   ///        <td>Activates all valid parameters for log.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>AKEY</td>
   ///        <td>Access Key used by the map layer.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>CLIENT</td>
   ///        <td>The client and version that generated the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>CLIENTID</td>
   ///        <td>A unique identifier for the client computer that generated the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>DATASRC</td>
   ///        <td>Data source name.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>ITEM</td>
   ///        <td>The type of request</td>
   ///    </tr>
   ///    <tr>
   ///        <td>LYRTYPE</td>
   ///        <td>Layer Type.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>MLNAME</td>
   ///        <td>Map layer name.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>MWIN</td>
   ///        <td>A composite item that generates entries for MWFURL, XMIN, YMIN, XMAX, and YMAX.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>MWFURL</td>
   ///        <td>The URL of the map that generated the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>NLAYER</td>
   ///        <td>The number of layers in the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>NSCALOG</td>
   ///        <td>A composite item that generates several entries that conform to the NCSA/CERN log file standard.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>PASSWORD</td>
   ///        <td>Password used by the map layer.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>PREC</td>
   ///        <td>A number that indicates map data precision.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>REQID</td>
   ///        <td>The request identification number.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>REQTIME</td>
   ///        <td>Time taken to process the request in seconds.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>SCALE</td>
   ///        <td>The current scale.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>TABLE</td>
   ///        <td>Feature table name used by the map layer.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>TRACKID</td>
   ///        <td>Customer tracking ID.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>USER</td>
   ///        <td>User ID used by this map layer.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>XMAX</td>
   ///        <td>The maximum X value of the area covered by the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>YMAX</td>
   ///        <td>The maximum Y value of the area covered by the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>XMIN</td>
   ///        <td>The minimum X value of the area covered by the request.</td>
   ///    </tr>
   ///    <tr>
   ///        <td>YMIN</td>
   ///        <td>The minimum Y value of the area covered by the request.</td>
   ///    </tr>
   /// </table>
   /// \n
   /// The valid Access log customization parameters are:
   /// CLIENT, CLIENTID, ITEM, NSCALOG, REQID, PREC, REQTIME, MWIN, MWFURL,
   /// XMAX, YMAX, XMIN, YMIN, NLAYER, SCALE, TRACKID.
   /// \n
   /// The valid Map Layer Access log customization parameters are:
   /// AKEY, CLIENT, CLIENTID, DATASRC, LYRTYPE, MLNAME, MWIN, MWFURL,
   /// NSCALOG, PASSWORD, PREC, REQID, REQTIME, SCALE, TABLE, TRACKID,
   /// USER, XMAX, YMAX, XMIN, YMIN.
   ///
   /// TODO:
   /// - Determine the valid log parameters for the various logs.
   ///
   /// ACCESS LOG PROPERTIES SECTION ------------------------------------------------------------------------------------
   /// Access Log properties.  This log records all requests to the MapGuide server.
   /// A record is created for each request after it has been completed.
   const AccessLogPropertiesSection  = "AccessLogProperties"; 
   /// Enables/disables the Access log
   const AccessLogPropertyEnabled  = "Enabled"; 
   const DefaultAccessLogPropertyEnabled  = true; 
   /// The Access log's file name.  NOTE: A log's filename may include the following special
   /// characters: %d,%m,%y, standing for date, month, year.  If one or all of these are used,
   /// the special char will be replaced by the actual calendar value when the log file is
   /// created.  A new log file will be created when the shortest time period has elapsed.
   /// That is, if the filename includes %d, a new log file will be created everyday.  If the
   /// filename contains both %m and %y, a new log file is created every month.
   const AccessLogPropertyFilename  = "Filename"; 
   const DefaultAccessLogPropertyFilename  = "Access.log"; 
   /// The Access log's parameters
   const AccessLogPropertyParameters  = "Parameters"; 
   const DefaultAccessLogPropertyParameters  = ""; 
   /// ADMIN LOG PROPERTIES SECTION -------------------------------------------------------------------------------------
   /// Admin Log properties.  This log records all administrative operations (server status
   /// changes, configuration changes, etc.).
   const AdminLogPropertiesSection  = "AdminLogProperties"; 
   /// Enables/disables the Admin log
   const AdminLogPropertyEnabled  = "Enabled"; 
   const DefaultAdminLogPropertyEnabled  = true; 
   /// The Admin log's file name.  NOTE: As with the Access Log, the special characters: %d,
   /// %m, %y may be used in the filename.
   const AdminLogPropertyFilename  = "Filename"; 
   const DefaultAdminLogPropertyFilename  = "Admin.log"; 
   /// The Admin log's parameters
   const AdminLogPropertyParameters  = "Parameters"; 
   const DefaultAdminLogPropertyParameters  = ""; 
   /// AUTHENTICATION LOG PROPERTIES SECTION ----------------------------------------------------------------------------
   /// Authentication Log properties.  This log records the success or failure of all
   /// authentication operations.
   const AuthenticationLogPropertiesSection  = "AuthenticationLogProperties"; 
   /// Enables/disables the Authentication log
   const AuthenticationLogPropertyEnabled  = "Enabled"; 
   const DefaultAuthenticationLogPropertyEnabled  = true; 
   /// The Authentication log's file name.  NOTE: As with the Access Log, the special
   /// characters: %d, %m, %y may be used in the filename.
   const AuthenticationLogPropertyFilename  = "Filename"; 
   const DefaultAuthenticationLogPropertyFilename  = "Authentication.log"; 
   /// The Authentication log's parameters
   const AuthenticationLogPropertyParameters  = "Parameters"; 
   const DefaultAuthenticationLogPropertyParameters  = ""; 
   /// ERROR LOG PROPERTIES SECTION -------------------------------------------------------------------------------------
   /// Error Log properties.  This log records all errors that occur during the MapGuide
   /// server's operation.
   const ErrorLogPropertiesSection  = "ErrorLogProperties"; 
   /// Enables/disables the Error log
   const ErrorLogPropertyEnabled  = "Enabled"; 
   const DefaultErrorLogPropertyEnabled  = true; 
   /// The Error log's file name.  NOTE: As with the Access Log, the special characters:
   /// %d, %m, %y may be used in the file name.
   const ErrorLogPropertyFilename  = "Filename"; 
   const DefaultErrorLogPropertyFilename  = "Error.log"; 
   /// The Error log's parameters
   const ErrorLogPropertyParameters  = "Parameters"; 
   const DefaultErrorLogPropertyParameters  = ""; 
   /// SESSION LOG PROPERTIES SECTION -----------------------------------------------------------------------------------
   /// Session Log properties.  This log records state information for each connection
   /// to the MapGuide server, such as connection ID, connection, duration,
   /// user name, operations received, and operations processed.
   const SessionLogPropertiesSection  = "SessionLogProperties"; 
   /// Enables/disables the Session log
   const SessionLogPropertyEnabled  = "Enabled"; 
   const DefaultSessionLogPropertyEnabled  = true; 
   /// The Session log's file name.  NOTE: As with the Access Log, the special
   /// characters: %d, %m, %y may be used in the filename.
   const SessionLogPropertyFilename  = "Filename"; 
   const DefaultSessionLogPropertyFilename  = "Session.log"; 
   /// The Session log's parameters
   const SessionLogPropertyParameters  = "Parameters"; 
   const DefaultSessionLogPropertyParameters  = ""; 
   /// TRACE LOG PROPERTIES SECTION -------------------------------------------------------------------------------------
   /// Trace Log properties.  This log records the details for each request (logged
   /// in the access log).  For example, each request can include data from several
   /// maps or feature sets, and a detailed record would be created for each one.
   const TraceLogPropertiesSection  = "TraceLogProperties"; 
   /// Enables/disables the Trace log
   const TraceLogPropertyEnabled  = "Enabled"; 
   const DefaultTraceLogPropertyEnabled  = true; 
   /// The Trace log's file name.  NOTE: As with the Access Log, the special
   /// characters: %d, %m, %y may be used in the filename.
   const TraceLogPropertyFilename  = "Filename"; 
   const DefaultTraceLogPropertyFilename  = "Trace.log"; 
   /// The Trace log's parameters
   const TraceLogPropertyParameters  = "Parameters"; 
   const DefaultTraceLogPropertyParameters  = ""; 
      ///////////////////////////////////////////////////////////////////////////
   /// Web Configuration Validation Information Maps
   ///
   /// AGENT PROPERTIES SECTION -----------------------------------------------------------------------------------------
   /// Agent properties
   const AgentPropertiesSection  = "AgentProperties"; 
   /// Number of seconds to wait before processing each request value
   const AgentDebugPause  = "DebugPause"; 
   const DefaultAgentDebugPause  = 0; 
   /// Disables Http operations used for Authoring
   const AgentDisableAuthoring  = "DisableAuthoring"; 
   /// Disables Http operations used for OGC Wfs
   const AgentDisableWfs  = "DisableWfs"; 
   /// Disables Http operations used for OGC Wms
   const AgentDisableWms  = "DisableWms"; 
   /// OGC PROPERTIES SECTION -------------------------------------------------------------------------------------------
   /// Ogc properties
   const OgcPropertiesSection  = "OgcProperties"; 
   /// Password for Wfs requests
   const WfsPassword  = "WfsPassword"; 
   /// Password for Wms requests
   const WmsPassword  = "WmsPassword"; 
   
}

/// \cond INTERNAL
//////////////////////////////////////////////////////////////////
/// \brief
/// Types of log files
class MgLogFileType
{
   /// Logs all requests to the MapGuide server.  A record is created
   /// for each request after it has been completed.
   const Access  = "AccessLog"; 
   /// Logs all administrative operations (server status changes, configuration changes, etc.).
   const Admin  = "AdminLog"; 
   /// Logs the success or failure of all authentication operations.
   const Authentication  = "AuthenticationLog"; 
   /// Logs all errors that occur during the MapGuide server's operation.
   const Error  = "ErrorLog"; 
   /// Logs state information for each connection to the MapGuide server,
   /// such as connection ID, connection, duration, user name, operations received,
   /// and operations processed.
   const Session  = "SessionLog"; 
   /// Logs the details for each request (logged in the access log).  For example,
   /// each request can include data from several maps or feature sets, and a detailed
   /// record would be created for each one.
   const Trace  = "TraceLog"; 
   
}

//////////////////////////////////////////////////////////////////
/// \brief
/// ServerAdmin properties.  Note that this is not a complete list of the properties which may be set
/// for a server.  Values stored in the server's config file are also properties of the server.  These
/// properties are defined in MgConfigProperties.h.
class MgServerInformationProperties
{
   /// INFO PROPERTIES SECTION ----------------------------------------------------------------------------------------
   /// The server's version
   const ServerVersion  = "ServerVersion"; 
   /// STATISTIC PROPERTIES SECTION -----------------------------------------------------------------------------------
   /// Gets the # of operations in the administrative queue
   const AdminOperationsQueueCount  = "AdminOperationsQueueCount"; 
   /// Gets the # of operations in the client queue
   const ClientOperationsQueueCount  = "ClientOperationsQueueCount"; 
   /// Gets the # of operations in the site queue
   const SiteOperationsQueueCount  = "SiteOperationsQueueCount"; 
   /// Gets the average time to process an operation
   const AverageOperationTime  = "AverageOperationTime"; 
   /// Gets the total amount of time used by the Server to process operations
   const TotalOperationTime  = "TotalOperationTime"; 
   /// Gets the current CPU utilization in percent
   const CpuUtilization  = "CpuUtilization"; 
   /// Gets the total physical memory in bytes
   const TotalPhysicalMemory  = "TotalPhysicalMemory"; 
   /// Gets the available physical memory in bytes
   const AvailablePhysicalMemory  = "AvailablePhysicalMemory"; 
   /// Gets the total virtual memory in bytes
   const TotalVirtualMemory  = "TotalVirtualMemory"; 
   /// Gets the available virtual memory in bytes
   const AvailableVirtualMemory  = "AvailableVirtualMemory"; 
   /// Gets the server uptime
   const Uptime  = "Uptime"; 
   /// Gets the server online/offline status
   const Status  = "Status"; 
   /// Gets the server display name
   const DisplayName  = "DisplayName"; 
   /// Gets the total operations received
   const TotalReceivedOperations  = "TotalReceivedOperations"; 
   /// Gets the total operations processed
   const TotalProcessedOperations  = "TotalProcessedOperations"; 
   /// Gets the total # of connections created on the server
   const TotalConnections  = "TotalConnections"; 
   /// Gets the total # of active connections on the server
   const TotalActiveConnections  = "TotalActiveConnections"; 
   /// Gets the operating system version
   const OperatingSystemVersion  = "OperatingSystemVersion"; 
   
}

/// \defgroup MgCoordinateSystemType MgCoordinateSystemType
/// \ingroup Coordinate_System_classes
/// \{
///////////////////////////////////////////////////////////////
/// \brief
/// Defines constants used to indicate the type of a coordinate
/// system.
///
class MgCoordinateSystemType
{
   ///////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate system is arbitrary. That is,
   /// it is not spatially bound to the earth, and the initial
   /// keyword in the WKT definition of the coordinate system is
   /// LOCAL_CS.
   ///
   ///
   const Arbitrary = 1 ; 
   ////////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate system is geographic. That is,
   /// the initial keyword in the WKT definition of the coordinate
   /// system is GEOGCS.
   ///
   ///
   const Geographic = 2 ; 
   //////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies that the coordinate system is projected. In most
   /// cases, the initial keyword in the WKT definition of the
   /// coordinate system is PROJCS. In some cases, the initial
   /// keyword is GEOGCS.
   ///
   ///
   const Projected = 3 ; 
   
}

/// \defgroup MgMapPlotInstruction MgMapPlotInstruction
/// \ingroup Mapping_Service_Module
/// \{
///////////////////////////////////////////////////////////////////////////////
/// \brief
/// MgMapPlotInstruction defines enumerated values used to indicate whether the plot
/// should be based on the center and scale of the map,
/// an overridden center and scale, or an overridden extent.
class MgMapPlotInstruction
{
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the plot should use the center and scale of the map
   ///
   const UseMapCenterAndScale = 0 ; 
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the plot should use the overridden center and scale of the map
   ///
   const UseOverriddenCenterAndScale = 1 ; 
   ///////////////////////////////////////////////////////////////////////////
   /// \brief
   /// Specifies the plot should use the overridden extent
   ///
   const UseOverriddenExtent = 2 ; 
   
}

///////////////////////////////////////////////////////////////////////////////
/// \brief
/// MgUnitType defines enumerated values used to determine the type
/// of units for plot decorations (scale bar).
class MgUnitType
{
   /// \if INTERNAL
   /// The "value(xxx)" comments are used by SWIG to build constants.php.  Do not alter them.
   /// \endif
   /// US English.
   const USEnglish  = "US-English"; /// \if INTERNAL  \endif 
   /// Metric.
   const Metric  = "Metric"; /// \if INTERNAL  \endif 
   
}

////////////////////////////////////////////////////////////////////////////////
/// <summary>
/// Types of UI target for a command
/// </summary>
class MgWebTargetType
{
   const TaskPane = 1 ; 
   const NewWindow = 2 ; 
   const SpecifiedFrame = 3 ; 
   
}

////////////////////////////////////////////////////////////////////////////////
/// <summary>
/// Types of target viewer
/// </summary>
class MgWebTargetViewerType
{
   const Dwf = 1 ; 
   const Ajax = 2 ; 
   const All = 3 ; 
   
}

////////////////////////////////////////////////////////////////////////////////
/// <summary>
/// Types of UI Widget
/// </summary>
class MgWebWidgetType
{
   const Command = 1 ; 
   const Separator = 2 ; 
   const Flyout = 3 ; 
   const TaskButton = 4 ; 
   
}

////////////////////////////////////////////////////////////////////////////////
/// <summary>
/// Types of task buttons
/// </summary>
class MgWebTaskButtonType
{
   const Home = 0 ; 
   const Back = 1 ; 
   const Forward = 2 ; 
   const Tasks = 3 ; 
   
}

////////////////////////////////////////////////////////////////////////////////
/// <summary>
/// Enumeration of all the possible actions that can be executed from the viewer.
/// </summary>
class MgWebActions
{
   const Pan = 1 ; 
   const PanUp = 2 ; 
   const PanDown = 3 ; 
   const PanRight = 4 ; 
   const PanLeft = 5 ; 
   const Zoom = 6 ; 
   const ZoomIn = 7 ; 
   const ZoomOut = 8 ; 
   const ZoomRectangle = 9 ; 
   const ZoomSelection = 10 ; 
   const FitWindow = 11 ; 
   const ViewPrevious = 12 ; 
   const ViewNext = 13 ; 
   const ViewRestore = 14 ; 
   const Select = 15 ; 
   const SelectRadius = 16 ; 
   const SelectPolygon = 17 ; 
   const SelectClear = 19 ; 
   const Refresh = 20 ; 
   const Copy = 21 ; 
   const About = 22 ; 
   const PrintMap = 23 ; 
   const GetPrintablePage = 24 ; 
   const Measure = 25 ; 
   const InvokeUrl = 26 ; 
   const Search = 27 ; 
   const Buffer = 28 ; 
   const ViewOptions = 30 ; 
   const InvokeScript = 31 ; 
   const SelectWithin = 32 ; 
   const Help = 33 ; 
   
}

?>