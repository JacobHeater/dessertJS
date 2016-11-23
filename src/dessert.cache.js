(function () {
    "use strict";

    define(dessertCachingModule);

    /**
     * Entry point for require for the dessertJS caching class.
     * 
     * @returns {Cache} The constructor for the dessertJS Cache. 
     */
    function dessertCachingModule() {
        return Cache;
    }

    /**
     * @class
     * 
     * @classdesc
     * 
     * A caching mechanism for dessertJS to cache different elements of the view. This helps with performance
     * during building of the views of the dessertJS initialization process. The caching mechanism tracks
     * several different elements of the view including Components, ExternalModules, and Templates.
     */
    function Cache() {
        var componentCacheHashTable = {};
        var externalModuleCacheHashTable = {};
        var templateCacheHashTable = {};
        var parentCache = this;
        var enabled = true;
        var getCacheForType = function getCacheForType(type) {
            var cache;
            switch (type) {
                case Cache.TYPE.COMPONENT:
                    cache = componentCacheHashTable;
                    break;
                case Cache.TYPE.EXTERNAL_MODULE:
                    cache = externalModuleCacheHashTable;
                    break;
                case Cache.TYPE.TEMPLATE:
                    cache = templateCacheHashTable;
                    break;
                default:
                    break;
            }

            return cache;
        };

        this.componentCache = {
            TYPE: Cache.TYPE.COMPONENT,
            addEntry: function componentCacheAddEntry(name, value) {
                parentCache.addEntry(this.TYPE, name, value);
                return this;
            },
            getEntry: function componentCacheGetEntry(name) {
                return parentCache.getEntry(this.TYPE, name);
            },
            removeEntry: function componentCacheRemoveEntry(name) {
                parentCache.removeEntry(this.TYPE, name);
                return this;
            },
            getHashTable: function componentCacheGetHashTable() {
                return parentCache.getHashTable(this.TYPE);
            }
        };

        this.templateCache = {
            TYPE: Cache.TYPE.TEMPLATE,
            addEntry: function templateCacheAddEntry(name, value) {
                parentCache.addEntry(this.TYPE, name, value);
                return this;
            },
            getEntry: function templateCacheGetEntry(name) {
                return parentCache.getEntry(this.TYPE, name);
            },
            removeEntry: function templateCacheRemoveEntry(name) {
                parentCache.removeEntry(this.TYPE, name);
                return this;
            },
            getHashTable: function templateCacheGetHashTable() {
                return parentCache.getHashTable(this.TYPE);
            }
        };

        this.externalModuleCache = {
            TYPE: Cache.TYPE.EXTERNAL_MODULE,
            addEntry: function externalModuleCacheAddEntry(name, value) {
                parentCache.addEntry(this.TYPE, name, value);
                return this;
            },
            getEntry: function externalModuleCacheGetEntry(name) {
                return parentCache.getEntry(this.TYPE, name);
            },
            removeEntry: function externalModuleCacheRemoveEntry(name) {
                parentCache.removeEntry(this.TYPE, name);
                return this;
            },
            getHashTable: function externalModuleCacheGetHashTable() {
                return parentCache.getHashTable(this.TYPE);
            }
        };

        this.addEntry = function cacheAddEntry(type, name, value) {
            if (this.enabled) {
                var cache = getCacheForType(type);
                if (cache) {
                    cache[name] = value;
                }
            }
            return this;
        };

        this.getEntry = function cacheGetEntry(type, name) {
            var entry;
            if (this.enabled) {
                var cache = getCacheForType(type);
                if (cache) {
                    entry = cache[name];
                }
            }
            return entry;
        };

        this.removeEntry = function cacheRemoveEntry(type, name) {
            if (this.enabled) {
                var cache = getCacheForType(type);
                if (cache) {
                    delete cache[name];
                }
            }
            return this;
        };

        this.getHashTable = function cacheGetHashTable(type) {
            var hashTable;
            if (this.enabled) {
                hashTable = getCacheForType(type);
            }
            return hashTable;
        };

        Object.defineProperties(this, {
            enabled: {
                get: function get_cacheEnabled() {
                    return enabled;
                },
                set: function set_cacheEnabled(value) {
                    if (typeof value === "boolean") {
                        enabled = value;
                    }
                }
            }
        });
    }

    Object.defineProperties(Cache, {
        TYPE: {
            writable: false,
            value: {
                COMPONENT: 1,
                EXTERNAL_MODULE: 2,
                TEMPLATE: 3
            }
        }
    });
})();