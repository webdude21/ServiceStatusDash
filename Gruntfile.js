module.exports = function (grunt) {
  const packageTarget = 'target/<%= pkg.name %>.zip';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      root: 'src',
      src: '<%= project.root %>/scripts',
      libs: '<%= project.root %>/lib',
      css: '<%= project.root %>/styles'
    },
    compress: {
      main: {
        options: {
          archive: packageTarget
        },
        files: [
          { expand: true, cwd: '<%= project.root %>', src: ['**/*'], dest: '/' }
        ]
      }
    },
    eslint: {
      app: ['<%= project.src %>/**/*.js']
    },
    clean: {
      zip: {
        src: [packageTarget]
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.registerTask('default', ['eslint', 'clean', 'compress']);
  grunt.registerTask('build', ['clean', 'compress']);
};
