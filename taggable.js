import tags from './tags.js';

class Taggable {
    addTag(template) {
        let tag = {};

        Object.assign(tag, template);

        let name = tag.name;
        delete tag.name;

        tag.initialize.apply(this);
        delete tag.initialize;

        let keys = Object.keys(tag);

        keys.forEach(handlerName => {
            this.wrapFunction(handlerName); 
            this.addTagHandler(handlerName, tag[handlerName]);
        })

        if (!this._tags) {
            this._tags = [name];
        } else {
            this._tags.push(name);
        }

        return this;
    }
}

export default Taggable;