var fs = require('fs');

var libPath  = __dirname + "/../lib/";

var niwaSources = [
    "header.js",
    "util/util.js",
    "world/physics.js",
    "world/physics_state.js",
    "world/actor.js",
    "world/actor_manager.js",
    "world/world.js",
    "actors/box/box_actor_info.js",
    "actors/box/box_actor.js",
    "actors/sphere/sphere_actor_info.js",
    "actors/sphere/sphere_actor.js",
    "actors/spot_light/spot_light_actor_info.js",
    "actors/spot_light/spot_light_actor.js",
    "actors/sky_box/sky_box_actor_info.js",
    "actors/sky_box/sky_box_actor.js",
    "actors/json_morph_anim_mesh/json_morph_anim_mesh_actor_info.js",
    "actors/json_morph_anim_mesh/json_morph_anim_mesh_actor.js",    
    "actors/json_mesh/json_mesh_actor_info.js",
    "actors/json_mesh/json_mesh_actor.js"
];


var niwaLocalBuildFile = __dirname + '/../builds/niwa_local.js';
var niwaLocalSources = niwaSources.concat(
    ["world/world_local.js"]
);

var niwaProxyBuildFile = __dirname + '/../builds/niwa_proxy.js';
var niwaProxySources = niwaSources.concat(
    ["world/world_proxy.js"]
);

var niwaServerBuildFile = __dirname + '/../builds/niwa_server.js';
var niwaServerSources = niwaSources.concat(
    ["world/world_server.js"]
);

var niwaBrowserBuildFile = __dirname + '/../builds/niwa_browser.js';
var niwaBrowserSources = [
    "header.js",
    "browser.js",
    "util/util.js",
    "user_interface/user_interface.js",
    "user_interface/actor_view.js",
    "user_interface/fpv_orbit_controls.js",
    "actors/box/box_actor_info.js",
    "actors/box/box_actor_view.js",
    "actors/sphere/sphere_actor_info.js",
    "actors/sphere/sphere_actor_view.js",
    "actors/spot_light/spot_light_actor_info.js",
    "actors/spot_light/spot_light_actor_view.js",
    "actors/sky_box/sky_box_actor_info.js",
    "actors/sky_box/sky_box_actor_view.js",
    "actors/json_morph_anim_mesh/json_morph_anim_mesh_actor_info.js",
    "actors/json_morph_anim_mesh/json_morph_anim_mesh_actor_view.js",    
    "actors/json_mesh/json_mesh_actor_info.js",
    "actors/json_mesh/json_mesh_actor_view.js"
];


var builder = function(buildFile, sourceList){
    var code = "";
    sourceList.forEach(
	function(file){
	    var fileName = libPath + file;
	    try {
		code += fs.readFileSync(fileName, "utf8");
		code += "\n\n";
	    } catch (e) {
		console.log(e.message);
	    }
	}
    );

    try {
	fs.openSync(buildFile, 'w');
	fs.writeFileSync(buildFile, code, 'utf8');
	console.log("created: " + buildFile);
    } catch (e) {
	console.log(e.message);
    }
}



builder(niwaLocalBuildFile, niwaLocalSources);
builder(niwaServerBuildFile, niwaServerSources);
builder(niwaProxyBuildFile, niwaProxySources);
builder(niwaBrowserBuildFile, niwaBrowserSources);


