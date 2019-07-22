//Godot @GlobalScope
const _GDTYPE = {

    NIL : 0x00000000,         //support
    BOOL : 0x00000001,        //support
    INT : 0x00000002,         //support
    INT64 : 0x00010002,       //support
    FLOAT : 0x00000003,       //support
    REAL : 0x00010003,        //support
    STRING : 0x00000004,      //support
    VECTOR2 : 0x00000005,     //support
    RECT2 : 0x00000006,       //support
    VECTOR3 : 0x00000007,     //support
    TRANSFORM2D : 0x00000008, //support
    PLANE : 0x00000009,       //support
    QUAT : 0x0000000A,       
    AABB : 0x0000000B,
    BASIS : 0x0000000C,
    TRANSFORM : 0x0000000D,
    COLOR : 0x0000000E,
    NODE_PATH : 0x0000000F,
   // RID : 16,  // do not support
   // OBJECT : 17, // do not support
    DICTIONARY : 0x00000010,   //support
    ARRAY : 0x00000011,        //support
    RAW_ARRAY : 0x00000012,
    INT_ARRAY : 0x00000013,
    REAL_ARRAY : 0x00000014,
    STRING_ARRAY : 0x00000015,
    VECTOR2_ARRAY : 0x00000016,
    VECTOR3_ARRAY : 0x00000017,
    COLOR_ARRAY : 0x00000018,

}
_GDTYPE.MAX = 27;

module.exports =  Object.freeze(_GDTYPE)

